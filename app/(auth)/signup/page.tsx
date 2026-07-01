"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authClient from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password, confirmPassword } = userData;

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
      });

      if (error) {
        setError(error.message || "Something went wrong. Please try again.");
        return;
      }

      console.log("Signup Success:", data);

      setUserData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/signin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account using your email.</CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/signin">Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={signup} autoComplete="off">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>

              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
