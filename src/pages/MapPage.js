/**
File Name : MapPage
Description : 지도 레이아웃
Author : 김유림

History
Date        Author   Status    Description
2024.06.14  김유림   Created
2024.06.14  임지영   Modified   RightTop 스타일 수정, 주변 공원 컴포넌트 추가
2024.06.14  김유림   Modified   Right스타일 수정, 공원정보 컴포넌트 추가
2024.06.14  임지영   Modified   LeftTop 모달창 확인용 컴포넌트 추가
2024.06.14  김유림   Modified   Right Section 배경색 변경
2024.06.16  김유림   Modified   main view , reviewDetail view생성
2024.06.17  김유림   Modified   검색 다시 누를경우 공원 정보 창 리셋
2024.06.18  김유림   Modified   리뷰 상세보기 갔다가 검색 다시 누를경우 main 뷰로 전환
*/

import React, {useState} from 'react'
import Header from '../components/common/Header'
import NearPark from '../components/map/output/NearPark'
import InfoPark from '../components/map/output/InfoPark'
import styled from 'styled-components'
import ModalLogin from '../components/map/output/LoginModal'
import ReviewDetail from '../components/map/output/ReviewDetail'
import '../assets/fonts/font.css'

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
`

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
`

const LeftSection = styled.div`
    flex: 2.5; /* 왼쪽 섹션이 부모의 1/6을 차지하도록 설정 */
    background-color: #f6f5f2; /* 예제용 배경색 */
    display: flex;
    flex-direction: column; /* 세로로 요소 배치 설정 */
`

const LeftTop = styled.div`
    flex: 1; /* 상위 섹션의 1/2를 차지하도록 설정 */
    background-color: #d9e6dc; /* 예제용 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`

const LeftBottom = styled.div`
    flex: 1; /* 하위 섹션의 1/2를 차지하도록 설정 */
    background-color: #e0edc6; /* 예제용 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`

const MiddleSection = styled.div`
    flex: 5; /* 가운데 섹션이 부모의 4/6을 차지하도록 설정 */
    background-color: #e0e0e0; /* 예제용 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
`

const RightSection = styled.div`
    flex: 2.5; /* 오른쪽 섹션이 부모의 2/6을 차지하도록 설정 */
    background-color: #ffffff; /* 예제용 배경색 */
    display: flex;
    flex-direction: column; /* 세로로 요소 배치 설정 */
`

const RightTop = styled.div`
    display: flex;
    margin: 10px;
`

const RightBottom = styled.div`
    display: flex;
    margin: 10px;
    margin-top: 0;
`

const MapPage = () => {
    const [view, setView] = useState('main')
    const [selectedParkId, setSelectedParkId] = useState(null)

    const handleParkClick = parkId => {
        console.log('Selected Park ID:', parkId)
        setSelectedParkId(parkId)
    }

    const handleReviewDetailClick = () => {
        setView('reviewDetail') /* 리뷰 상세 보기 뷰 상태 업데이트 */
    }

    const handleBackClick = () => {
        setView('main') /*메인 뷰로 돌아가기 뷰 상태 업데이트 */
    }

    const [showParkList, setShowParkList] = useState(false)
    const openParkList = () => {
        setShowParkList(!showParkList)
        setSelectedParkId(null) // 공원 선택 다시 누르면 selectedParkId 초기화 => 공원정보 빔
        setView('main') // 리뷰 상세보기 보다가 공원 검색 버튼을 누르면 view를 다시 'main'으로 설정
    }

    return (
        <MainLayout>
            <Header />
            <ContentWrapper>
                <LeftSection>
                    <LeftTop>
                        <button onClick={openParkList}>
                            공원 검색 샘플 버튼
                        </button>
                    </LeftTop>
                    <LeftBottom>
                        <button onClick={openParkList}>
                            직접 검색 샘플 버튼
                        </button>
                    </LeftBottom>
                </LeftSection>
                <MiddleSection>Middle Content</MiddleSection>
                <RightSection>
                    {view === 'main' && (
                        <>
                            <RightTop>
                                <NearPark
                                    onParkClick={handleParkClick}
                                    showParkList={showParkList}
                                />
                                {/* 공원 클릭 핸들러 전달 */}
                            </RightTop>
                            <RightBottom>
                                <InfoPark
                                    parkId={selectedParkId}
                                    onReviewDetailClick={
                                        handleReviewDetailClick
                                    }
                                />
                            </RightBottom>
                        </>
                    )}
                    {view === 'reviewDetail' && selectedParkId && (
                        <ReviewDetail
                            park={selectedParkId}
                            onBackClick={handleBackClick}
                        />
                    )}
                </RightSection>
            </ContentWrapper>
        </MainLayout>
    )
}

export default MapPage
