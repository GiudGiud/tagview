import React from "react";
import { useState } from "react";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import {
    AppBar,
    Box,
    Checkbox,
    Drawer,
    FormControlLabel, ListItemText, Divider, ListSubheader, FormControl,
    ListItemIcon, FormGroup, Link, List, TextField,
    ListItem,
    Toolbar,
    Typography, Card, CardHeader, CardMedia, CardContent, Avatar, CardActions, Button
} from "@mui/material";
import { blue } from '@mui/material/colors';
import defaultImage from './assets/default-image.avif';

import Grid from '@mui/material/Unstable_Grid2';
import Search from './Search';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const data = {
    data: [
        {
            name: "MoosePage1",
            path: "moose/modules/doc/content/index.md",
            key_vals: { key1: "aval;test1;test2;test3;test4", keya: "val" },
            description: 'test content test content test content test content test content test content test content test content test content test content test content test content test content test content test content test content '
        },
        {
            name: "MoosePage2",
            path: "moose/modules/heat_conduction/doc/content/modules/heat_conduction/index.md",
            link: "https://www.google.com/",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/core_plate_mesh.png', 
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { keyheat: "valheat;valheat3;Val4;valheat3;Val4", key: "val", key1: "eval;aval" },
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
            key_vals: { key1: "dval;test8;test9;test10;t11;t12;t12", keya: "val", thing1: "thing2" },
        },
        {
            name: "MoosePage6",
            path: "moose/modules/doc/content/index2.md",
            image: 'https://mooseframework.inl.gov/virtual_test_bed/media/sfr_minicore/core_plate_mesh.png',
            description: 'This VTB model provides an example representative of a Sodium cooled Fast Reactor (SFR) using metallic fuel. Reactor core analyses of SFR require the modeling of multiple physics systems',
            key_vals: { key1: "dval", keya: "val;m1;m2;m3;m4;m5;m6;m7;m8", keychem: "kc", thing1: "thing2" },
        },
    ],
};

const drawerWidth = 240;

function App() {

    const [checked_keys, setCheckedKeys] = useState(new Set());
    const [search, setSearch] = useState();

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
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Select Tags
                    </Typography>                    
                    <Search value={search} onChange={(e) => { setSearch(e.target.value); }} />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
                variant="permanent"
                anchor="left"
            
            >
                <Toolbar />

                <Box sx={{ overflow: 'auto' }}>

                    {Object.keys(menu_data).map((key) => {
                        return <SectionBlock checkedItems={checked_keys} key={key} sectionTitle={key} items={menu_data[key]} data={data.data} handleCheck={handleCheck} />;
                    })}

                </Box>

            </Drawer>            

            <Box component="main" sx={{ flexGrow: 1, bgcolor: "white", p: 3, mt: 4 }}>
                <Grid container spacing={2}>
                    {data.data
                        .filter((row) => {

                            let matchedSearchText = false;

                            // Search text checks 
                            if (search) {
                                if (row.name.toLowerCase().includes(search.toLowerCase())
                                    || row.description.toLowerCase().includes(search.toLowerCase())) {
                                    matchedSearchText = true;
                                }
                            } else {
                                // No search term used to filter, so assume a match
                                matchedSearchText = true;
                            }

                            let found_keys = {};

                            // Avoid displaying all results when opening the page
                            if (checked_keys.size == 0 && !search) {
                                return false;
                            }

                            // Keep track of which data entries (row) matched the key/value of the user-selected checked_keys
                            for (const checked_key of checked_keys) {
                                const [checked_key_name, checked_key_value] =
                                    checked_key.split(":");

                                // A given key/value pair (row.key_vals) in the input dictionary can contain multiple
                                // values. If the checked value is one of these values, we display this dictionary entry
                                if (checked_key_name in row.key_vals) {
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

                            return true && matchedSearchText;
                        })

                        .map((row) => (
                            <Grid xs={12} md={6} lg={4} display='flex'>
                                <Card sx={{ width: '100%', minWidth: '250px' }}>
                                    <CardHeader title={row.name} avatar={<Avatar sx={{ bgcolor: blue[500] }}>{row.key_vals.reactor_type ? row.key_vals.reactor_type.substring(0, 1) : 'R'}</Avatar>} />
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

const SectionBlock = ({ sectionTitle, items, handleCheck, checkedItems, data }) => {

    const [showMoreButton, setShowMoreButton] = useState(true);

    const enableShowMore = items.size >= 8;

    let title = sectionTitle.replaceAll('_', ' ');
    const menuData = data;

    //console.log("Found menuData", sectionTitle, menuData, {items});

    return <><List sx={{ textAlign: 'left' }} dense={true}
        subheader={
            <ListSubheader component="div" id="nested-list-subheader" style={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px' }}>
                {title}
            </ListSubheader>
        }>

        
        {Array.from(items).map((val, idx) => {
            // If the user were to add this item to the results and it netted nothing, then exclude it as a non-valid option
            // UNLESS another value from this same key is already selected

            let isEnabled = true;
            let otherValuesInKeysAreChecked = false;
            
            // First, check if a value from this key is already selected and return true to signify that this menu is enabled
            for (const checked_key of checkedItems) {
                const [checkedKey, checkedValue] = checked_key.split(":");
                //console.log("checked_key already", checkedKey, sectionTitle, checkedKey === sectionTitle);
                if (checkedKey === sectionTitle) {
                    otherValuesInKeysAreChecked = true;
                }
            }
            
            // Check if the checkedItems plus this item makes a match with any menu data
            let searchItems = new Set(checkedItems);
            searchItems.add(`${sectionTitle}:${val}`);
                        
            const hasItems = data.filter((m)=>{
                let foundAnyData = true;
                for (const checked_key of searchItems) {
                    const [checkedKey, checkedValue] = checked_key.split(":");
                    
                    // The m.key_vals will be a string with values separate by a ;
                    if (!m.key_vals[checkedKey] || !m.key_vals[checkedKey].toString().includes(checkedValue)) {
                        foundAnyData = false;
                    }
                }

                return foundAnyData;
            });

            // This menu option will be enabled if any data would match if the user selected 
            // OR if any values in this key are selected elsewhere
            isEnabled = hasItems.length != 0 || otherValuesInKeysAreChecked; 

            // Disable the disable
            isEnabled = true;

            // Show more / show nothing (if we are hiding overflow) / show the menu
            if (enableShowMore && idx == 8 && showMoreButton) {
                return <OverflowButton title='Show More' onClick={() => { setShowMoreButton(false); }} />;
            } else if (enableShowMore && idx > 8 && showMoreButton) {
                return null;
            } else {
                let id = `${sectionTitle}:${val}`;

                // Return the menu item and if the showMOrebutton is disabled, we include the "show less" if we are on the final item
                return <>
                    <MenuItem key={id} id={id} title={val} handleCheck={handleCheck} enabled={isEnabled} />
                    {idx == items.size - 1 && !showMoreButton && <OverflowButton title='Show Less' onClick={() => { setShowMoreButton(true); }} />}
                </>;
            }           
            
        })
    }

    </List><Divider /></>;
};

const OverflowButton = ({title, onClick}) => {

    return <ListItem disablePadding disableGutters dense={true} sx={{ pl: '16px', height: '35px', color: 'rgb(54,65,82)' }} onClick={onClick} >
        <ListItemText dense disableTypography style={{ textTransform: 'capitalize' }}>
            <FormControl margin='none' size='small' fullWidth>
                <FormControlLabel control={<span>&nbsp;&nbsp;&nbsp;</span>} label={title} componentsProps={{ typography: { variant: 'overline', color:'blue' } }} />
            </FormControl>
        </ListItemText>
    </ListItem>;
};

const MenuItem = ({ title, handleCheck, id, enabled }) => {

    // Some titles come in with _, replace those with spaces
    title = title.replaceAll('_', ' ');

    return <ListItem disablePadding disableGutters dense={true} sx={{ pl: '16px', height: '35px', color: 'rgb(54,65,82)' }}  >
        <ListItemText dense disableTypography style={{ textTransform: 'capitalize' }}>
            <FormControl margin='none' size='small' fullWidth>
                <FormControlLabel control={<Checkbox size='small' value={id} onChange={handleCheck} disabled={!enabled} />} label={title} componentsProps={{ typography: { variant: 'caption' } }} />
            </FormControl>
        </ListItemText>
    </ListItem>;
}

export default App;
