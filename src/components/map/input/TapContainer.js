/**
File Name : TapContainer.js
Description : 검색 탭 컨테이너
Author : 임지영

History
Date        Author   Status    Description
2024.06.17  임지영    Created
2024.06.20  임지영    Modified  Redux 적용
*/

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import LocationSearch from './LocationSearch'
import DirectSearch from './DirectSearch'
import LocationInputButton from './LocationInputButton'
import DirectInputButton from './DirectInputButton'
import {useDispatch, useSelector} from 'react-redux'
import {
    setCity,
    setDistrict,
    setSelectedChips,
    clearSelection,
    setShowParkList,
} from '../../redux/parkSlice'

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function TapContainer() {
    const dispatch = useDispatch()

    // // Redux state를 가져옴
    const {city, district, selectedChips, name} = useSelector(
        state => state.park,
    )

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleClearSelection = () => {
        dispatch(clearSelection())
    }

    return (
        <Box sx={{width: '98%'}}>
            <Box sx={{borderColor: 'divider'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    sx={{
                        display: 'flex',
                        '& .MuiTabs-flexContainer': {
                            justifyContent: 'space-between',
                        },
                    }}
                >
                    <Tab
                        label="지역 검색"
                        {...a11yProps(0)}
                        sx={{
                            borderRadius: '8px 0 0 8px',
                            width: '50%',
                            height: '20px',
                            backgroundColor:
                                value === 0 ? '#30CB6E' : '#C7D1CB',
                            color: value === 0 ? 'white' : 'grey',
                            minHeight: '40px',
                        }}
                    />
                    <Tab
                        label="직접 검색"
                        {...a11yProps(1)}
                        sx={{
                            borderRadius: '0 8px 8px 0',
                            width: '50%',
                            height: '20px',
                            backgroundColor:
                                value === 1 ? '#30CB6E' : '#C7D1CB',
                            color: value === 1 ? 'white' : 'grey',
                            minHeight: '40px',
                        }}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <LocationSearch />
                <LocationInputButton />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <DirectSearch name={name} />
                <DirectInputButton
                    name={name}
                    onClearSelection={handleClearSelection}
                />
            </CustomTabPanel>
        </Box>
    )
}
