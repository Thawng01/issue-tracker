import React, { Suspense } from "react";
import { Flex } from "@radix-ui/themes";

import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnName } from "./IssueTable";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Issue Tracker - Issues List",
    description: "View all issues",
};

interface Props {
    searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
    const pageSize = 10;
    const page = parseInt(searchParams.page) || 1;
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy = columnName.includes(searchParams.orderBy)
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
        <Flex direction="column" gap="4">
            <IssueActions />
            <IssueTable issues={issues} searchParams={searchParams} />
            <Suspense>
                <Pagination
                    currentPage={page}
                    itemCount={issueCount}
                    pageSize={pageSize}
                />
            </Suspense>
        </Flex>
    );
};

export default IssuesPage;
