'use client'

import { useEffect, useState } from 'react'
import { todo } from '@prisma/client'

export default function Home() {
    const [todos, setTodos] = useState<todo[]>([])

   const [inputVal, setInputVal] = useState<string>('')


    useEffect(() => {
        const getTodo = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
            const data = await res.json()
            setTodos(data)
        }
        getTodo()
    }, [])


   const postTodo = async () => {

       if (!inputVal) return alert('タイトルを入力してください')

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`, {

           method: 'POST',

           headers: {

               'Content-Type': 'application/json',

           },

           body: JSON.stringify({

               title: inputVal,

           }),

       })

       const data = await res.json()

       setTodos([...todos, data])

       setInputVal('')

   }
   const deleteTodo = async (id: number) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`,
        {
            method: 'DELETE',
        },
    )
    const data = await res.json()
    setTodos(todos.filter((todo) => todo.id !== data.id))
}
const patchTodo = async (todo: todo) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isDone: !todo.isDone,
            }),
        },
    )
    const data = await res.json()
    setTodos(
        todos.map((todo) => {
            if (todo.id === data.id) {
                return data
            }
            return todo
        }),
    )
}



    return (
        <>

           <input
               placeholder="タイトル入力"

               value={inputVal}

               onChange={(e) => setInputVal(e.target.value)}

       />

           <button onClick={() => postTodo()}>追加</button>

            {todos.map((todo) => (
                <div key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.isDone}
                        onChange={() => patchTodo(todo)}
                    />
                    <p>{todo.id}</p>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                    <p>{todo.isDone}</p>
                    <p>{new Date(todo.createdAt).toLocaleString()}</p>
                    <p>{new Date(todo.updatedAt).toLocaleString()}</p>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                       className="bg-rose-400 px-2 py-1 rounded"
                   >
                       削除
                   </button>
                </div>
            ))}
        </>
    )
}


