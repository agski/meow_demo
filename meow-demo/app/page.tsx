"use client";

import { useState, ReactNode, useEffect } from "react";

const host = "http://localhost:3000"


export default function Home() {
  const [users, setUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("")
  const [selectedUserData, setSelectedUserData] = useState(undefined)

  const searchUsers = async() => {
    const userSearchResult = await fetch(`${host}/users?name=${nameFilter}`)
    if (userSearchResult.status !== 200) {
      alert(`Unexpected api error: ${userSearchResult.status}`)
    }

    const userSearchData = await userSearchResult.json()
    if (userSearchData['status_code'] !== 200) {
      alert(`Error searching users: ${userSearchData['status_message']}`)
    }
    setUsers(userSearchData.data)
  }

  const getUser = async(userId: number) => {
    const userGetResult = await fetch(`${host}/users/${userId}`)
    if (userGetResult.status !== 200) {
      alert(`Unexpected api error: ${userGetResult.status}`)
    }
    const userGetData = await userGetResult.json()
    if (userGetData['status_code'] !== 200) {
      alert(`Error searching users: ${userGetData['status_message']}`)
    }
    setSelectedUserData(userGetData['data'])
  }
  
  useEffect(() => {
    searchUsers().catch(console.error)
  }, [nameFilter])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-6">
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">filter by name</label>
          <input onChange={e => setNameFilter(e.target.value)} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="filter by name" />
        </form>
        <br />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                  id
              </th>
              <th scope="col" className="px-6 py-3">
                  name
              </th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => 
            (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-700"
              onClick = {() => getUser(user['id'])}
            >
              <td className="px-6 py-3 ">
                {user['id']}
              </td>
              <td className="px-6 py-3">
                {user['name']}
              </td>
            </tr>)
          )}
          </tbody>
        </table>
        <br />
        {selectedUserData && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                  id
              </th>
              <th scope="col" className="px-6 py-3">
                  name
              </th>
              <th scope="col" className="px-6 py-3">
                  phone number
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-3">
                  {selectedUserData['id']}
                </td>
                <td className="px-6 py-3">
                  {selectedUserData['name']}
                </td>
                <td className="px-6 py-3">
                  {selectedUserData['phoneNumber']}
                </td>
              </tr>
          </tbody>
        </table>
        )}
      </div>
    </main>
  );
}
