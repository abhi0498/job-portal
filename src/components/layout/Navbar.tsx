"use client";

// import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Flex, Link, VisuallyHidden } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { LuBriefcase } from "react-icons/lu";

const Navbar = () => {
  const t = useTranslations("Navigation");
  //   const bgColor = useColorModeValue("white", "gray.800");
  //   const borderColor = useColorModeValue("gray.200", "gray.700");

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
        href="#"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LuBriefcase style={{ height: "1.5rem", width: "1.5rem" }} />
        <VisuallyHidden>{t("logo")}</VisuallyHidden>
      </Link>
      <Flex as="nav" ml="auto" gap={{ base: 4, sm: 6 }}>
        <Link
          as={NextLink}
          href="#"
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
      </Flex>
    </Box>
  );
};

export default Navbar;
