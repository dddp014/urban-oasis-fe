import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // park 관련 초기 상태
    view: 'main',
    showParkList: false,
    selectedParkId: 0,
    searchResults: {},
    // search 관련 초기 상태
    city: '',
    district: '',
    selectedChips: [],
    name: '',
    // 공원정보관 관련 초기 상태
    data: null,
    parkName: '',
    ratings: 0,
    getData: {},
    getName: '',
    isLocation: true,
}

const parkSlice = createSlice({
    name: 'park',
    initialState,
    reducers: {
        setSelection: (state, action) => {
            state.city = action.payload.city
            state.district = action.payload.district
            state.selectedChips = action.payload.selectedChips
            state.name = action.payload.name
        },
        // park 관련 액션
        setView: (state, action) => {
            state.view = action.payload
        },
        setShowParkList: (state, action) => {
            state.showParkList = action.payload
        },
        setSelectedParkId: (state, action) => {
            state.selectedParkId = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        resetSelection: state => {
            state.selectedParkId = null
            state.showParkList = false
        },
        // search 관련 액션
        setCity: (state, action) => {
            state.city = action.payload
        },
        setDistrict: (state, action) => {
            state.district = action.payload
        },
        setSelectedChips: (state, action) => {
            state.selectedChips = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        clearSelection: state => {
            state.city = ''
            state.district = ''
            state.selectedChips = []
        },
        // 공원정보 관련 액션
        setData: (state, action) => {
            state.data = action.payload
        },
        setParkName: (state, action) => {
            state.parkName = action.payload
        },
        setRatings: (state, action) => {
            state.ratings = action.payload
        },
        // 버튼 클릭했을 때 정보 넘어가도록
        setGetData: (state, action) => {
            state.getData = action.payload
        },
        setGetName: (state, action) => {
            state.getName = action.payload
        },
        // 지역인지 직접인지
        setIsLocation: (state, action) => {
            state.isLocation = action.payload
        },
    },
})

export const {
    setSelection,
    setView,
    setShowParkList,
    setSelectedParkId,
    setSearchResults,
    resetSelection,
    setCity,
    setDistrict,
    setSelectedChips,
    setName,
    clearSelection,
    setData,
    setParkName,
    setRatings,
    setGetData,
    setGetName,
    setIsLocation,
} = parkSlice.actions

export default parkSlice.reducer
