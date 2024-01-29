import { IssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";


export async function PATCH(request: NextRequest,
    { params }: { params: { id: string } }
) {

    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Forbidden", { status: 401 })

    const body = await request.json()
    const validation = IssueSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) {
        return NextResponse.json("No issue found with the given Id.", { status: 404 })
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: params.id },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Forbidden", { status: 401 })

    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) return NextResponse.json("Invalid Issue", { status: 404 })

    await prisma.issue.delete({
        where: { id: params.id }
    })

    return NextResponse.json({})
}