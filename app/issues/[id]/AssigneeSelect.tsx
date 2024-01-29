"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/app/components";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton />;

    if (error) return null;

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedUserId || "unassigned"}
                onValueChange={(userId) => {
                    const assignedUserId =
                        userId === "unassigned" ? null : userId;
                    axios
                        .patch("/aspi/issues/" + issue.id, {
                            assignedUserId,
                        })
                        .catch(() => {
                            toast.error("Changes couldn't be saved.");
                        });
                }}
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map((user) => {
                            return (
                                <Select.Item key={user.id} value={user.id}>
                                    {user.name}
                                </Select.Item>
                            );
                        })}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

export default AssigneeSelect;
