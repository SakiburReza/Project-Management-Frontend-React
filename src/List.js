import * as React from 'react';
import SignUpForm from './SignUp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from "react";
import { API } from "./api.tsx";

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  const [allMembers, setAllMembers] = useState([]);

  useEffect(() => {
    
        API.getAllUser().then((r) => {
          setAllMembers(r.data);
          console.log(r.data);
     
      })
 
   
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
 
  function handleAddMember(){
    console.log(checked)
  
  }

  return (
    <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {allMembers.map((value) => {
      const labelId = `checkbox-list-label-${value}`;

      return (
        <ListItem
          key={value}
          disablePadding
        >
          <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.username}`} />
          </ListItemButton>
        </ListItem>
      );
    })}
  </List>
   <button type="submit" onClick={handleAddMember}>Add member</button>
   </>
  );
}