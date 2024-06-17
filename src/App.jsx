import React from "react";
import { useState } from "react";
import "./App.css";
import {
    AppBar,
    Box,
    Checkbox,
    CssBaseline,
    Drawer,
    FormControlLabel, ListItemText, Divider, ListSubheader, FormControl,
    ListItemIcon,
    FormGroup,
    Link,
    List,
    ListItem,
    Toolbar,
    Typography, Card, CardHeader, CardMedia, CardContent, Avatar, CardActions, Button
} from "@mui/material";
import { blue } from '@mui/material/colors';
import defaultImage from './assets/default-image.avif';

import Grid from '@mui/material/Unstable_Grid2';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const data = {
    data: [
        {
            name: "MoosePage1",
            path: "moose/modules/doc/content/index.md",
            key_vals: { key1: "aval", keya: "val" },
            description: 'test content test content test content test content test content test content test content test content test content test content test content test content test content test content test content test content '
        },
        {
            name: "MoosePage2",
            path: "moose/modules/heat_conduction/doc/content/modules/heat_conduction/index.md",
            link: "https://www.google.com/",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/core_plate_mesh.png', 
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { keyheat: "valheat;valheat3;Val4;valheat3;Val4", key: "val", key1: "eval" },
        },
        {
            name: "MoosePage3",
            path: "moose/modules/level_set/doc/content/modules/level_set/example_vortex.md",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/bison_mesh.png',
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { keyvor: "valvor", key: "val", key1: "cval" },
        },
        {
            name: "MoosePage4",
            path: "moose/modules/geochemistry/doc/content/modules/geochemistry/index.md",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/bison_mesh_zoomed.png',
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { keyg: "valg", keychem: "valuechem" },
        },
        {
            name: "MoosePage5",
            path: "moose/modules/doc/content/index2.md",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/core_plate_mesh.png',
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { key1: "dval", keya: "val", thing1: "thing2" },
        },
        {
            name: "MoosePage6",
            path: "moose/modules/doc/content/index2.md",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/core_plate_mesh.png',
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { key1: "dval", keya: "val", keychem: "kc", thing1: "thing2" },
        },
    ],
};

const drawerWidth = 240;

function App() {

    const [checked_keys, setCheckedKeys] = useState(new Set());

    // Build the datastructure for the menu
    const menu_data_arrays = {};
    for (const row of data.data) {
        for (const key in row.key_vals) {
            // Create category if encountering a new one
            if (!menu_data_arrays[key]) {
                menu_data_arrays[key] = new Array();
            }

      // Create new keys from the entries in the dictionary
      // ; is the separator, so we create multiple entries if we find it
      for (const new_key in row.key_vals[key].toString().split(";")) {
        menu_data_arrays[key].push(row.key_vals[key].split(";")[new_key]);
      }
    }
  }

    // Sort each category alphabetically
    for (const key in menu_data_arrays) {
        menu_data_arrays[key].sort();
    }

    // Convert arrays to sets
    const menu_data = {};
    for (const key in menu_data_arrays) {
        menu_data[key] = new Set();
        for (const item of menu_data_arrays[key]) {
            menu_data[key].add(item);
        }
    }

    const handleCheck = (event) => {
        if (event.target.checked) {
            checked_keys.add(event.target.value);
            setCheckedKeys(new Set(checked_keys));
        } else {
            checked_keys.delete(event.target.value);
            setCheckedKeys(new Set(checked_keys));
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Select Tags
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >

                {Object.keys(menu_data).map((key) => {
                    return <SectionBlock checkedItems={checked_keys} key={key} sectionTitle={key} items={menu_data[key]} menuItem={data.data} handleCheck={handleCheck} />;
                })}

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "white", p: 3, mt: 4 }}>
                <Grid container spacing={2}>
                    {data.data
                        .filter((row) => {
                            let found_keys = {};

                            // Avoid displaying all results when opening the page
                            if (checked_keys.size == 0) {
                                return false;
                            }

              // Keep track of which data entries (row) matched the key/value of the user-selected checked_keys
              for (const checked_key of checked_keys) {
                const [checked_key_name, checked_key_value] =
                  checked_key.split(":");

                // A given key/value pair (row.key_vals) in the input dictionary can contain multiple
                // values. If the checked value is one of these values, we display this dictionary entry
                if (checked_key_name in row.key_vals)
                {
                  if (row.key_vals[checked_key_name].toString().includes(checked_key_value))
                    found_keys[checked_key_name] = true;
                }
              }

              // If any of the keys were not in the data entry with the right value
              // then exclude the data entry. For that key, it did not have the right value.
              for (const checked_key of checked_keys) {
                const [checked_key_name, checked_key_value] =
                  checked_key.split(":");

                                if (!found_keys[checked_key_name]) { 
                                    return false; 
                                }
                            }

                            return true;
                        })

                        .map((row) => (
                            <Grid xs={12} md={6} lg={4} display='flex'>
                                <Card sx={{ width: '100%', minWidth: '250px' }}>
                                    <CardHeader title={row.name} avatar={<Avatar sx={{ bgcolor: blue[500] }}>{row.key_vals.reactor_type ? row.key_vals.reactor_type.substring(0,1) : 'R'}</Avatar>} />
                                    <CardMedia component="img" image={row.image ?? defaultImage} alt={row.name} height='190' />
                                    <CardContent sx={{ height: '120px' }}>
                                        <Typography variant="body2" color="text.secondary" >
                                            {row.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>                                        
                                        <Button size="small" href={row.link}>Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>                
                        ))}
                </Grid>
            </Box>
        </Box>
    );
}

const SectionBlock = ({ sectionTitle, items, handleCheck, checkedItems, menuItem }) => {

    let title = sectionTitle.replaceAll('_', ' ');
    const menuData = menuItem;

    //console.log("Found menuData", menuData, {items});

    return <><List sx={{ textAlign: 'left' }} dense={true}
        subheader={
            <ListSubheader component="div" id="nested-list-subheader" style={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px' }}>
                {title}
            </ListSubheader>
        }>

        {Array.from(items).map((val) => {

            let isEnabled = true;

            // If the user were to add this item to the results and it netted nothing, then exclude it as a non-valid option
            // Check to make sure that this row has all the same key:vals in it            

            // Check if the checkedItems plus this item makes a match with any menu data
            let searchItems = new Set(checkedItems);
            searchItems.add(`${sectionTitle}:${val}`);
            //console.log("found Search Items", checkedItems, searchItems, sectionTitle, val);
            
            const hasItems = menuData.filter((m)=>{
                let foundAnyData = true;
                for (const checked_key of searchItems) {
                    const [checkedKey, checkedValue] = checked_key.split(":");
                    //console.log(`found Menu [${val}][${m.name}]`, {checked_key}, m.key_vals[checkedKey] === checkedValue);
                    if (m.key_vals[checkedKey] !== checkedValue) {
                        foundAnyData = false;                        
                    }
                }

                return foundAnyData;
            });

            //console.log("foundAllKeys", hasItems, sectionTitle, searchItems);

            isEnabled = hasItems.length != 0;
            //isEnabled = true;

            let id = `${sectionTitle}:${val}`;
            return <MenuItem key={id} id={id} title={val} handleCheck={handleCheck} enabled={isEnabled} />;
}       )}

    </List><Divider /></>;
};

const MenuItem = ({ title, handleCheck, id, enabled }) => {

    // Some titles come in with _, replace those with spaces
    title = title.replaceAll('_', ' ');

    //console.log("enabled", enabled);

    return <ListItem disablePadding disableGutters dense={true} sx={{ pl: '16px', height: '35px', color: 'rgb(54,65,82)' }}  >
        <ListItemText dense disableTypography style={{ textTransform: 'capitalize' }}>
            <FormControl margin='none' size='small' fullWidth>
                <FormControlLabel control={<Checkbox size='small' value={id} onChange={handleCheck} disabled={!enabled} />} label={title} componentsProps={{ typography: { variant: 'caption' } }} />
            </FormControl>
        </ListItemText>
    </ListItem>;
}

export default App;
