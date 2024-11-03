import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import styles from "../styles/SignUp";
import BottomButton from "../components/BottomButton";
import TopTitle from "../components/TopTitle";

// const BASE_URL = "http://3.39.26.152:8000";

export default function SignUp({navigation}: NavigationProp):React.JSX.Element {
    const [id, setID] = useState<string>('');
    const [pw, setPW] = useState<string>('');
    const [secondPW, setSecondPW] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [authenticationNumber, setAuthenticationNumber] = useState<string>('0'); //인증번호 입력 변수 
    const [compareViewAuth, setCompareViewAuth] = useState<boolean>(false);
    const [checkedAuthentication, setCheckedAuthentication] = useState<boolean>(false); //인증번호 맞는지 T/F변수
    const [comparePW, setComparePW] = useState<boolean>(false); //비밀번호 같은지 확인
    const [authenticationId, setAuthenticationId] = useState<string>('2'); //id 중복확인


    // const handleSignup = async () => {
    //     if (email && password && name && phone && username) {
    //       try {
    //         const response = await axios.post(`${BASE_URL}/api/users/`, {
    //           email : email,
    //           password : password,
    //           name : name,
    //           phone : phone,
    //           username : username,
    //           subscribed:  clickAgreement === 1// 동의 여부
    //         });
            
    //         // 회원가입 성공 시 페이지 이동
    //         navigate('/login'); // 성공적으로 가입한 후 메인 페이지로 이동
    //       } catch (error) {
    //         console.log("Error during signup:");
    //       }
    //     }
    //   };

    function handleBack() {
        navigation.goBack();
    }
    function handleIdInput(id : string) {
        setID(id);
    }

    function handlePwInput(pw : string) {
        setPW(pw);
        if(pw == secondPW) {
            setComparePW(true)
            return comparePW 
        } else {
            setComparePW(false)
            return comparePW
        }
    }

    function handleSecondPW(secondPW: string) {
        setSecondPW(secondPW);
        if(pw == secondPW) {
            setComparePW(true)
            return comparePW 
        } else {
            setComparePW(false)
            return comparePW
        }
    }
    function handleName(name : string) {
        setName(name)
    }
    function handlePhone(phone : string) {
        setPhone(phone);
    }
    function handleAuthentication(authenticationNumber: string) {
        setAuthenticationNumber(authenticationNumber);
    }


    function handleGetAuthentication() {
        if(phone.length === 11) {
            Alert.alert('인증번호를 받았습니다.');
            setCompareViewAuth(true);
        } else {
            Alert.alert('휴대폰 번호 11자리를 입력하세요.');
        }
        
    }
    function handleSetAuthentication() {
        if(authenticationNumber === '123') {
            Alert.alert('인증 성공');
            setCheckedAuthentication(true);
        } else {
            Alert.alert('인증에 실패하셨습니다.');
            setCheckedAuthentication(false);
        }
    }

    function handleDuplicate() {
            //  const Duplicate = async () => {
            //     if (id) {
            //       try {
            //         const response = await axios.post(`${BASE_URL}/api/users/`, {
            //           id : id //보낼 변수
            //         });
                    
            //         if(response.data) {
            //           setAuthenticationId(id);
            //         }
            //         Alert.alert("사용하셔도 되는 아이디 입니다.")
            //       } catch () {
            //         Alert.alert("중복된 아이디 입니다.")
            //       }
            //     }
            //   }; 
    }


    function handleLoginPage() {
        if(comparePW && checkedAuthentication && (authenticationId === id)) {
            console.log(id);
            console.log(pw);
            console.log(phone);
            console.log(name);
            setID('');
            setPW('');
            setSecondPW('');
            setPhone('');
            setName('');
            setAuthenticationNumber('0');
            setCheckedAuthentication(false);
            setAuthenticationId('');
            setCompareViewAuth(false);
            navigation.navigate('Login')
        }
    }


    return (<SafeAreaView style={styles.container}>
        <View style={styles.signWrap}>
            <TopTitle name="회원가입" onPress={handleBack}/>
            <View style={styles.padding}></View>
        
            <Text style={styles.lableText}>아이디</Text>
            <View style={styles.authBox}>
                <TextInput style={styles.inputButton} placeholder="아이디" placeholderTextColor="#929292" onChangeText={handleIdInput}></TextInput>
                <TouchableOpacity style={styles.buttonBox} onPress={handleDuplicate}>
                    <Text style={styles.buttonText}>중복확인</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.lableText}>비밀번호</Text>
            <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#929292" onChangeText={handlePwInput}></TextInput>
            <TextInput style={styles.input} placeholder="비밀번호 확인" placeholderTextColor="#929292" onChangeText={handleSecondPW}></TextInput>

            <Text style={styles.lableText}>이름</Text>
            <TextInput style={styles.inputName} placeholder="성명을 입력하세요" placeholderTextColor='#929292' onChangeText={handleName}/>
            <Text style={styles.lableText}>휴대폰 인증</Text>
            <View style={styles.authBox}>
                <TextInput style={styles.inputButton} placeholder="휴대폰 번호 (- 제외하고 입력)" placeholderTextColor="#929292" onChangeText={handlePhone}></TextInput>
                <TouchableOpacity style={styles.buttonBox} onPress={handleGetAuthentication}>
                    <Text style={styles.buttonText}>인증번호 받기</Text>
                </TouchableOpacity>
            </View>
            {
            !compareViewAuth ? null :
                <View style={styles.authBox}>
                    <TextInput style={styles.inputButton} placeholder="인증 번호" placeholderTextColor="#929292" onChangeText={handleAuthentication}></TextInput>
                    <TouchableOpacity style={styles.buttonBox} onPress={handleSetAuthentication}>
                        <Text style={styles.buttonText}>인증번호 확인</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
        <TouchableOpacity style= {styles.bottomButtonBox}>
             <BottomButton name="가입하기" onPress={handleLoginPage} checked={comparePW && checkedAuthentication && name !== '' && authenticationId !== ''} color="#1B1B1B"/>
        </TouchableOpacity>
    </SafeAreaView>)
}

