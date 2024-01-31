import React from "react";
import { Table } from "@radix-ui/themes";

import prisma from "@/prisma/client";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
const IssuesPage = async ({ searchParams }: Props) => {
    const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
    }[] = [
        { label: "Issue", value: "title" },
        {
            label: "Status",
            value: "status",
            className: "hidden md:table-cell",
        },
        {
            label: "CreatedAt",
            value: "createdAt",
            className: "hidden md:table-cell",
        },
    ];
    const pageSize = 10;
    const page = parseInt(searchParams.page) || 1;
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy = columns
        .map((column) => column.value)
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc" }
        : undefined;

    const issues = await prisma.issue.findMany({
        where: {
            status,
        },

        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where: { status } });

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => {
                            return (
                                <Table.ColumnHeaderCell
                                    key={column.value}
                                    className={column.className}
                                >
                                    <Link
                                        href={{
                                            query: {
                                                ...searchParams,
                                                orderBy: column.value,
                                            },
                                        }}
                                    >
                                        {column.label}
                                    </Link>
                                    {column.value === searchParams.orderBy && (
                                        <ArrowUpIcon className="inline" />
                                    )}
                                </Table.ColumnHeaderCell>
                            );
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link
                                    href={`/issues/${issue.id}`}
                                    className="hover:underline"
                                >
                                    {issue.title}
                                    <div className="block md:hidden">
                                        <IssueStatusBadge
                                            status={issue.status}
                                        />
                                    </div>
                                </Link>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination
                currentPage={page}
                itemCount={issueCount}
                pageSize={pageSize}
            />
        </div>
    );
};

export default IssuesPage;
