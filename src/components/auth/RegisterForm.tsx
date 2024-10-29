"use client";

import {
  Box,
  Button,
  Input,
  VStack,
  Select,
  Text,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Field } from "../ui/field";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Registration failed");
      }

      toaster.create({
        title: "Registration successful",
        description: "You can now sign in with your credentials",
        type: "success",
        duration: 5000,
      });

      router.push("/auth/signin");
    } catch (error) {
      toaster.create({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxW="md">
      <Card.Root p={5} style={{ margin: "auto" }}>
        <Card.Header>
          <Text fontSize="2xl" fontWeight="bold">
            Register
          </Text>
        </Card.Header>
        <Card.Body>
          <VStack gap={4}>
            <Field label="Name" helperText="Enter your full name">
              <Input name="name" type="text" borderColor="gray.200" />
            </Field>

            <Field label="Email" helperText="Enter your email address">
              <Input name="email" type="email" placeholder="me@example.com" />
            </Field>

            <Field
              label="Password"
              helperText="Password must be at least 8 characters long"
            >
              <PasswordInput name="password" />
            </Field>

            <Button type="submit" colorScheme="blue" width="full">
              Register
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
