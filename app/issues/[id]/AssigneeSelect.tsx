"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Skeleton } from "@/app/components";

const AssigneeSelect = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/xapi/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton />;

    if (error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) => {
                        return <Select.Item value="1">{user.name}</Select.Item>;
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
