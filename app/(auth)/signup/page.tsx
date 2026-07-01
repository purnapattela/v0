"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up for an account</CardTitle>
        <CardDescription>Enter your email below to create an account</CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/signin">Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form autoComplete="off">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Pending Tasks:
 * 1. Redirect on sign in link click
 * 2. Implement form submission logic
 * 3. Add validation and error handling
 */
