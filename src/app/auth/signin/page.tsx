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
import { Field } from "@/components/ui/field";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      // Redirect to dashboard or home page after successful login
      router.push("/");
      router.refresh();
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxW="md">
      <Card.Root p={5} style={{ margin: "auto" }}>
        <Card.Header>
          <Text fontSize="2xl" fontWeight="bold">
            Login
          </Text>
        </Card.Header>
        <Card.Body>
          <VStack gap={4}>
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
              Login
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
