import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { NavigationProp } from '../navigation/NavigationProps';
import NextArrow from '../assets/icon_next_arrow.svg';
import Eclips from '../assets/icon_eclips.svg';
import Cancel from '../assets/icon_cancel.svg';
import styles from "../styles/Pay";
import BottomButton from "../components/BottomButton";
import TopTitle from "../components/TopTitle";

export default function Pay({ navigation }: NavigationProp):React.JSX.Element {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [peopleModalVisible, setPeopleModalVisible] = useState<boolean>(false);
    const [requestText, setRequestText] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [couponCount ,setCouponCount] = useState<number>(0);
    const [count, setCount] = useState<number>(0); //식사 인원 카운트 수
    const[selectedCount, setSelectedCount] = useState<number>(0); //확정된 식사 인원 카운트 수 
    


    function handleBack() {
        navigation.navigate('Shopping');
    }
    function handleReqPopUp() {
        setModalVisible(true);
    }
    function handlePeoplePopUP() {
        setPeopleModalVisible(true);
    }
    function handlePeopleCountInitial() {
        setCount(0);
        setSelectedCount(0);
    }

    function handleMoveReception() {
        navigation.navigate('Reception');
    }

    function handleSubmitRequest() {
        setRequestText(requestText);
        setModalVisible(false);
    }
    function handleCancelRequest() {
        setRequestText('');
        setModalVisible(false);
    }
    function handlePlus() {
        setCount(count+1);
    }
    function handleMinus() {
        if(count > 0) {
            setCount(count-1);
        }
    }
    function handleCancelPeoplePopUP() {
        setSelectedCount(count);
        setPeopleModalVisible(false);
    }

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.wrap}>
                <TopTitle name="주문하기" onPress={handleBack} />

                <View style={styles.padding}></View>

                <View>
                    <Text style={styles.labelText}>가게 요청사항</Text>
                    <TouchableOpacity style={styles.inputBox} onPress={handleReqPopUp}>
                        <Text>{requestText || '요청 입력'}</Text>
                        <TouchableOpacity style={styles.nextArrow}>
                            <NextArrow/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {selectedCount > 0 && (
                    <View style={styles.inputBox}>
                        <TouchableOpacity style={styles.temporal} onPress={handlePeoplePopUP}>
                            <Eclips />
                            <Text style={styles.mealType}>매장식사 • {selectedCount}명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextArrow} onPress={handlePeopleCountInitial}>
                            <Text style={styles.changePeopleCount}>변경하기</Text>
                            <NextArrow/>
                        </TouchableOpacity>
                    </View>
                    )}
                    {selectedCount == 0 && (
                        <View style={styles.inputBox}>
                            <TouchableOpacity style={styles.temporal} onPress={handlePeoplePopUP}>
                                <Eclips />
                                <Text style={styles.mealType}>매장식사</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.temporal}>
                                <Eclips />
                                <Text style={styles.mealType}>픽업</Text>
                            </TouchableOpacity> 
                        </View>
                    )}
                </View>
                <TouchableOpacity>
                    <Text style={styles.labelText}>할인쿠폰</Text>
                    <View style={styles.inputBox}>
                        <Text style={couponCount == 0 ? {color : '#A1A1A1'} : {}}>{couponCount == 0 ? '사용 가능한 쿠폰이 없습니다.' :`사용 가능한 쿠폰이 ${couponCount}장 있습니다.`}</Text>
                        <TouchableOpacity style={styles.nextArrow}>
                            <NextArrow/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={styles.labelText}>결제하기</Text>
                    <View style={styles.payInfo}>
                            <View style={styles.whiteBox}>
                                <Text style={styles.papaPoint}>패패오더 포인트</Text>
                                <View style={styles.textBox}>
                                    <Text style={styles.myPoint}>총 보유 포인트</Text>
                                    <Text style={styles.myPoint}>50,000 P</Text>
                                </View>
                            </View>
                            <View style={styles.grayBox}>
                                <View style={styles.textBox}>
                                    <Text style={styles.payPoint}>결제 포인트</Text>
                                    <Text style={styles.payPoint}>- 28,000 P</Text>
                                </View>
                                <View style={styles.textBox}>
                                    <Text style={styles.payPoint}>예상 포인트 잔액</Text>
                                    <Text style={styles.payPoint}>22,000 P</Text>
                                </View>
                            </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        <BottomButton name="결제하기" onPress={handleMoveReception} />

        {/* 요청사항 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTextBox}>
                            <Text style={styles.modalText}>가게 요청사항</Text>
                            <TouchableOpacity onPress={handleCancelRequest}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="예) 양파 빼주세요, 안 맵게 해주세요"
                            placeholderTextColor={'#484747'}
                            value={requestText}
                            onChangeText={setRequestText}
                        />
                        <View style={styles.checkWrap}>
                            <TouchableOpacity
                            style={styles.checkBox}
                            onPress={() => setChecked(!checked)}>
                            {checked && (
                                <View style={styles.customCheckBox}>
                                <View style={styles.checkMark} />
                                </View>
                            )}
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>다음에도 사용</Text>
                        </View>
                    </View>
                </View>
                <BottomButton name='완료' onPress={handleSubmitRequest} />
            </Modal>

        {/* 식사 인원 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={peopleModalVisible}
                onRequestClose={() => {
                    setPeopleModalVisible(!peopleModalVisible);
                }}>
                <View style={styles.peopleModalBackground}>
                    <View style={styles.peopleModalView}>
                        <View style={styles.peopleModalTopBox}>
                            <Text style={styles.peopleModalText}>매장 식사 인원 수</Text>
                        <View style={styles.count}>
                            <TouchableOpacity onPress={handleMinus}>
                                <Text style={styles.countText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.countText}>{count}</Text>
                                <TouchableOpacity onPress={handlePlus}>
                                    <Text style={styles.countText}>+</Text>
                                </TouchableOpacity>
                        </View>
                        </View>
                        <TouchableOpacity style = {styles.peopleCountButton} onPress={handleCancelPeoplePopUP}>
                            <Text style={styles.peopleCountButtonText}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
    )
}   