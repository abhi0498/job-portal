"use client";

import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, Card, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function RegisterForm() {
  const [, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        toaster.create({
          title: "Error",
          description: "Invalid email or password",
          type: "error",
        });
        return;
      }

      // Redirect to dashboard or home page after successful login
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toaster.create({
        title: "Error",
        description: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" minH="80vh">
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

              <Link
                as={NextLink}
                href="/auth/register"
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Don&apos;t have an account? Register
              </Link>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Box>
    </Flex>
  );
}
