import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";


export async function PATCH(request: NextRequest,
    { params }: { params: { id: string } }
) {

    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json("Forbidden", { status: 401 })

    const body = await request.json()
    console.log(body)
    const validation = patchIssueSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const { assignedUserId, title, description } = body
    if (assignedUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedUserId } })
        if (!user) return NextResponse.json({ error: "Invalid Id. " }, { status: 400 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) {
        return NextResponse.json({ error: "No issue found with the given Id." }, { status: 404 })
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: params.id },
        data: {
            title,
            description,
            assignedUserId
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