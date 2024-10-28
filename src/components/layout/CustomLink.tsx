"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

const CustomLink = (props: LinkProps) => {
  const pathname = usePathname();
  console.log(pathname, props.href);
  return (
    <ChakraLink
      asChild
      {...props}
      borderBottom={pathname === props.href ? "2px solid" : "none"}
    >
      <NextLink href={props.href!}>{props.children}</NextLink>
    </ChakraLink>
  );
};

export default CustomLink;
