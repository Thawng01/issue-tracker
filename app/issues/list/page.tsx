import React from "react";
import { Table } from "@radix-ui/themes";

import prisma from "@/prisma/client";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";
import Link from "next/link";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000);

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
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
                                        {issue.status}
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
        </div>
    );
};

export default IssuesPage;