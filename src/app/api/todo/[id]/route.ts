import { todo } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    // todoテーブルのレコードを削除
    const id = Number(params.id)
    try {
        const todo: todo = await prisma.todo.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error)
    }
}
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } },
) {
    // todoテーブルのレコードを更新
    const body = await request.json()
    const id = Number(params.id)
    try {
        const todo: todo = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                isDone: body.isDone,
            },
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error)
    }
}
