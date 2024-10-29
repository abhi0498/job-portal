"use client";

import { Box, Flex, Link, Stack, Text, VisuallyHidden } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { LuBriefcase, LuLogOut, LuUser } from "react-icons/lu";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardRoot,
} from "../ui/hover-card";
import { Avatar } from "../ui/avatar";

const Navbar = () => {
  const t = useTranslations("Navigation");
  const { data: session } = useSession();

  return (
    <Box
      as="header"
      px={{ base: 4, lg: 6 }}
      height="14"
      display="flex"
      alignItems="center"
    >
      <Link
        as={NextLink}
        href="/"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LuBriefcase style={{ height: "1.5rem", width: "1.5rem" }} />
        <VisuallyHidden>{t("logo")}</VisuallyHidden>
      </Link>
      <Flex as="nav" ml="auto" gap={{ base: 4, sm: 6 }} alignItems="center">
        <Link
          as={NextLink}
          href="/auth/register"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("findJobs")}
        </Link>
        <Link
          as={NextLink}
          href="#"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("postJob")}
        </Link>
        <Link
          as={NextLink}
          href="#"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("blog")}
        </Link>
        <Link
          as={NextLink}
          href="#"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          {t("contact")}
        </Link>

        {session ? (
          <HoverCardRoot>
            <HoverCardTrigger>
              <Box cursor="pointer">
                <Avatar
                  name={session.user?.name || "User"}
                  src={session.user?.image || undefined}
                />
              </Box>
            </HoverCardTrigger>
            <HoverCardContent
              align="end"
              side="bottom"
              sideOffset={5}
              className="w-[240px]"
            >
              <HoverCardArrow />
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text fontWeight="medium">{session.user?.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {session.user?.email}
                  </Text>
                </Stack>
                <Stack spacing={2}>
                  <Link
                    as={NextLink}
                    href="/profile"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    px={3}
                    py={2}
                    rounded="md"
                    _hover={{ bg: "gray.100" }}
                  >
                    <LuUser size={16} />
                    <Text fontSize="sm">Profile</Text>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    leftIcon={<LuLogOut size={16} />}
                    justifyContent="start"
                    width="full"
                    px={3}
                  >
                    Sign out
                  </Button>
                </Stack>
              </Stack>
            </HoverCardContent>
          </HoverCardRoot>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Navbar;
