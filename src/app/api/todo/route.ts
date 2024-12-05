import { todo } from '@prisma/client'
import prisma from '../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    // todoテーブルから全件取得
    try {
        const todos: todo[] = await prisma.todo.findMany()
        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json(error)
    }
}
export async function POST(request: Request) {
    // todoテーブルに新規レコードを追加
    const body = await request.json()
    try {
        const todo: todo = await prisma.todo.create({
            data: {
                title: body.title,
            },
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error)
    }
}

