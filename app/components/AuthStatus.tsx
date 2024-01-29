"use client";
import {
    Avatar,
    Box,
    DropdownMenu,
    DropdownMenuItem,
    Link,
    Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width="3rem" />;
    return (
        <Box>
            {status === "authenticated" && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={session.user?.image!}
                            fallback="?"
                            size="2"
                            radius="full"
                            className="cursor-pointer"
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size="4">{session.user?.email}</Text>
                        </DropdownMenu.Label>
                        <DropdownMenuItem>
                            <Link href="/api/auth/signout">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
            )}
        </Box>
    );
};

export default AuthStatus;
