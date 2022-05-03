import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Table, ScrollArea, Button, Avatar, SimpleGrid } from '@mantine/core';
import { UserContext } from '../../context/userContext/UserContext';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';
import { Search } from 'tabler-icons-react';
import formatDistance from 'date-fns/formatDistance';

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  }

  return (
    <>
    <TextInput
      size="md"
      placeholder="Search by username"
      onChange={(e) => setSearch(e.target.value)}
      rightSectionWidth={42}
      style={{ marginTop: '20px', marginBottom: '10px' }}
      icon={<Search size={24} color='black' />}
    />
    <SimpleGrid cols={2}>
      <TextInput
        size="md"
        placeholder="Search by First Name"
        onChange={(e) => setSearch(e.target.value)}
        rightSectionWidth={42}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        icon={<Search size={24} color='black' />}
      />
      <TextInput
        size="md"
        placeholder="Search by Last Name"
        onChange={(e) => setSearch(e.target.value)}
        rightSectionWidth={42}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        icon={<Search size={24} color='black' />}
      />
    </SimpleGrid>
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" style={{ justifyContent: 'center' }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>User Since</th>
            <th>Last Updated</th>
            <th>Username</th>
            <th>Name</th>
            <th>User Actions</th>
          </tr>
        </thead>
        <tbody>
        {
        users
        ?.filter((user) => {
          if(search === ''){
            return true
          } else if(user.username.toLowerCase().includes(search.toLowerCase())){
            return true
          }
          return false
        })
        .map((user) => {
          const dateStr = user.updatedAt;
          const str = formatDistance(
            new Date(dateStr),
            new Date()
          );
          return (
            <tr key={user._id}>
            <td>
              <Avatar src={user.profilePic} alt={user.username} radius="xl" size={40} />
            </td>
            <td>{user.createdAt}</td>
            <td>{str} ago</td>
            <td>{user.username}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>
              <Button type="Submit" variant="light" color="orange" size="sm" style={{ marginRight: '10px' }}>Edit</Button>
              <Button type="Submit" variant="light" color="red" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
            </td>
          </tr>
          )
        })
        }
        </tbody>
      </Table>
    </ScrollArea>
    </>
  )
}

export default UserList;