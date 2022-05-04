import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Table, ScrollArea, Button, Avatar, SimpleGrid } from '@mantine/core';
import { UserContext } from '../../context/userContext/UserContext';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';
import { Search } from 'tabler-icons-react';
import formatDistance from 'date-fns/formatDistance';
import { Pagination } from '@mui/material';

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

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
        .slice((page - 1) * 10, (page - 1) * 10 + 10)
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
    <Pagination
      count={(users?.length / 10).toFixed(0)}
      onChange={(_, value) => {
        setPage(value);
        window.scroll(0, 450);
      }}
      style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
    />
    </>
  )
}

export default UserList;