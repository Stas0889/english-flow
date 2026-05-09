import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const getAuthRedirectUrl = () => `${window.location.origin}${window.location.pathname}`;

const useSupabaseAuth = () => {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }) => {
    if (!supabase) {
      throw new Error("Supabase не настроен.");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signUp = async ({ email, password }) => {
    if (!supabase) {
      throw new Error("Supabase не настроен.");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };

  const resendSignupEmail = async (email) => {
    if (!supabase) {
      throw new Error("Supabase не настроен.");
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });

    if (error) {
      throw error;
    }
  };

  return {
    authLoading,
    isSupabaseConfigured,
    resendSignupEmail,
    session,
    signIn,
    signOut,
    signUp,
    user: session?.user ?? null,
  };
};

export default useSupabaseAuth;
