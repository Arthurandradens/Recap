-- PR Resume - Supabase Migration
-- Run this in your Supabase SQL Editor to set up the database.

-- Repositories: each user can track multiple repos
CREATE TABLE public.repositories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, owner, repo)
);

-- Summaries: cached AI summaries, per user + repo + date
CREATE TABLE public.summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  repository_id UUID NOT NULL REFERENCES public.repositories(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  repository TEXT NOT NULL,
  summary TEXT NOT NULL,
  daily_suggestion TEXT NOT NULL DEFAULT '',
  relevance_score INTEGER NOT NULL DEFAULT 0,
  relevance_justification TEXT NOT NULL DEFAULT '',
  pull_requests JSONB NOT NULL,
  commits JSONB NOT NULL,
  stats JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, repository_id, date)
);

-- Subscriptions: Stripe subscription state
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Daily usage tracking for rate limiting
CREATE TABLE public.daily_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  request_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users manage own repos" ON public.repositories
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own summaries" ON public.summaries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users read own usage" ON public.daily_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Service role needs full access for server-side operations
-- (Service role key bypasses RLS by default in Supabase)
