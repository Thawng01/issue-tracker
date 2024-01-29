"use client";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
];
const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    return (
        <nav className=" px-6 py-3 border-b">
            <Container>
                <Flex justify="between">
                    <Flex gap="5">
                        <Link href="/">
                            <BsBugFill className="text-2xl" />
                        </Link>
                        <ul className="flex space-x-6">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={classNames({
                                            "text-zinc-900":
                                                currentPath === link.href,
                                            "text-zinc-500":
                                                currentPath !== link.href,
                                            "hover:text-zinc-800 transition-colors":
                                                true,
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>

                    <Box>
                        {status === "authenticated" && (
                            <Link href="/api/auth/signout">Logout</Link>
                        )}
                        {status === "unauthenticated" && (
                            <Link href="/api/auth/signin">Login</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
