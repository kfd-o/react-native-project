import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import hideName from '../../utils/hideName';
import api from '../../api/api';

const RequestScreen = ({route, navigation}) => {
  const {visitor_id, first_name, last_name, contact_num} = route.params;
  const [requestVisit, setRequestVisit] = useState([]);
  const [formData, setFormData] = useState({
    visitor_id: visitor_id,
    homeowner_id: null,
    contact_num: `${contact_num}`,
    classify_as: '',
    contract_start_date: new Date(),
    contract_end_date: new Date(),
    date_of_visit: new Date(),
    time_of_visit: new Date(),
  });
  const [errors, setErrors] = useState({
    homeowner_id: false,
    classify_as: false,
  });
  const [homeownerOpen, setHomeownerOpen] = useState(false);
  const [homeownerValue, setHomeownerValue] = useState(null);
  const [homeowner, setHomeowner] = useState([]);

  const [classifyOpen, setClassifyOpen] = useState(false);
  const [classifyValue, setClassifyValue] = useState(null);
  const [classify, setClassify] = useState([
    {label: 'Family', value: 'family'},
    {label: 'Friend', value: 'friend'},
    {label: 'Maintenance', value: 'maintenance'},
    {label: 'Utility Worker', value: 'utility_worker'},
    {label: 'Contractor', value: 'contractor'},
    {label: 'Delivery', value: 'delivery'},
  ]);

  const [showContractRange, setShowContractRange] = useState(false);
  const [contractRangeMode, setContractRangeMode] = useState('start-date');
  const [contractStartDate, setContractStartDate] = useState(new Date());
  const [contractEndDate, setContractEndDate] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalIsRequestExistVisible, setModalIsRequestExistVisible] =
    useState(false);

  const getHomeownerNameById = id => {
    const homeownerObj = homeowner.find(homeowner => homeowner.value === id);
    return homeownerObj ? homeownerObj.label : 'Unknown';
  };

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchRequestVisitVisitorHomeownerId = async () => {
    try {
      const response = await api.get(
        '/request-visit/fetch-visitor-homeowner/id',
      );
      setRequestVisit(response.data);
    } catch (error) {
      console.log('There are no visit request');
    }
  };

  const onChangeContractDate = (event, selectedDate) => {
    const currentDate =
      selectedDate ||
      (contractRangeMode === 'start-date'
        ? contractStartDate
        : contractEndDate);
    setShowContractRange(false);
    if (contractRangeMode === 'start-date') {
      setContractStartDate(currentDate);
      handleChange('contract_start_date', currentDate);
    } else {
      setContractEndDate(currentDate);
      handleChange('contract_end_date', currentDate);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    if (mode === 'date') {
      setDate(currentDate);
      handleChange('date_of_visit', currentDate);
    } else {
      setTime(currentDate);
      handleChange('time_of_visit', currentDate);
    }
  };

  const showModeContractRange = currentMode => {
    setShowContractRange(true);
    setContractRangeMode(currentMode);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const handleDropDownChangeHomeowner = value => {
    setHomeownerValue(value);
    handleChange('homeowner_id', value);
    setErrors(prevState => ({...prevState, homeowner_id: false}));
  };

  const handleDropDownChangeClassify = value => {
    setClassifyValue(value);
    handleChange('classify_as', value);
    setErrors(prevState => ({...prevState, classify_as: false}));
  };

  const handleSubmit = async () => {
    const formattedContractStartDate =
      formData.contract_start_date.toLocaleDateString('en-CA');
    const formattedContractEndDate =
      formData.contract_end_date.toLocaleDateString('en-CA');
    const formattedDate = formData.date_of_visit.toLocaleDateString('en-CA');
    const formattedTime = formData.time_of_visit.toLocaleTimeString('en-GB', {
      hour12: false,
    });

    const newFormData = {
      ...formData,
      contract_start_date: formattedContractStartDate,
      contract_end_date: formattedContractEndDate,
      date_of_visit: formattedDate,
      time_of_visit: formattedTime,
    };
    const isRequestExist = requestVisit.some(
      item =>
        item.visitor_id === newFormData.visitor_id &&
        item.homeowner_id === newFormData.homeowner_id,
    );
    console.log(isRequestExist);
    if (!isRequestExist) {
      try {
        const response = await api.post(
          '/request-visit/homeowner',
          newFormData,
        );

        if (response.status === 201) {
          setModalVisible(!modalVisible);
          setModalSuccessVisible(!modalSuccessVisible);
          fetchRequestVisitVisitorHomeownerId();
        }
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log('You have a pending request for this homeowner.');
      setModalIsRequestExistVisible(!modalIsRequestExistVisible);
      setModalVisible(!modalVisible);
    }
  };

  const handleModal = () => {
    if (!formData.homeowner_id || !formData.classify_as) {
      console.log('Error: All fields must be filled.');
      closeDropdowns();
      setErrors(prevState => ({
        ...prevState,
        homeowner_id: !formData.homeowner_id ? true : false,
        classify_as: !formData.classify_as ? true : false,
      }));
    } else {
      console.log('Setting modalVisible to:', !modalVisible);
      setModalVisible(!modalVisible);
    }
  };
  console.log(errors);
  console.log(modalIsRequestExistVisible);
  const closeDropdowns = () => {
    setHomeownerOpen(false);
    setClassifyOpen(false);
  };

  const handleContinue = () => {
    setModalSuccessVisible(!modalSuccessVisible);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'VisitorScreen'}],
      }),
    );
  };

  const handleContinueError = () => {
    setModalIsRequestExistVisible(!modalIsRequestExistVisible);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'VisitorScreen'}],
      }),
    );
  };

  useEffect(() => {
    const fetchHomeownerData = async () => {
      try {
        const response = await api.get('/protected/homeowner');
        const formattedData = response.data.map(homeowner => ({
          label: `${hideName(homeowner.first_name)} ${hideName(
            homeowner.last_name,
          )}`,
          value: homeowner.id,
        }));
        setHomeowner(formattedData);
      } catch (error) {
        console.error('There was an error fetching the homeowner data!', error);
      }
    };
    fetchHomeownerData();
  }, []);
  useEffect(() => {
    fetchRequestVisitVisitorHomeownerId();
  }, []);

  useEffect(() => {
    if (homeownerOpen) {
      setClassifyOpen(false);
    }
  }, [homeownerOpen]);

  useEffect(() => {
    if (classifyOpen) {
      setHomeownerOpen(false);
    }
  }, [classifyOpen]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        closeDropdowns();
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalOverlay}>
            <View
              style={
                formData.classify_as === 'contractor'
                  ? styles.modalProcessContainerContractor
                  : styles.modalProcessContainer
              }>
              <View
                style={{
                  flex: 1,
                  paddingVertical: hp('1%'),
                  paddingHorizontal: wp('4%'),
                }}>
                <View style={{paddingVertical: hp('2%')}}>
                  <Text
                    style={{
                      color: '#5D6D7E',
                      fontSize: hp('2.4%'),
                      fontWeight: '500',
                      paddingVertical: hp('.5%'),
                    }}>
                    Request Information
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#f6f8fa',
                    paddingVertical: hp('4%'),
                    paddingHorizontal: wp('3%'),
                    justifyContent: 'center',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      color: '#85929E',
                      fontWeight: '500',
                    }}>{`Homeowner`}</Text>
                  <Text style={{color: '#85929E'}}>{`${getHomeownerNameById(
                    formData.homeowner_id,
                  )}`}</Text>
                  <Text
                    style={{
                      color: '#85929E',
                      marginTop: hp('2%'),
                      fontWeight: '500',
                    }}>{`Your Information`}</Text>
                  <Text
                    style={{
                      color: '#85929E',
                    }}>{`${first_name} ${last_name}`}</Text>
                  <Text
                    style={{
                      color: '#85929E',
                    }}>{`${formData.contact_num}`}</Text>
                  <Text style={{color: '#85929E'}}>{`${
                    formData.classify_as &&
                    formData.classify_as[0].toUpperCase()
                  }${formData.classify_as.slice(1)}`}</Text>
                  {classifyValue === 'contractor' && (
                    <>
                      <Text
                        style={{
                          color: '#85929E',
                          marginTop: hp('2%'),
                          fontWeight: '500',
                        }}>{`Contract Range`}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: '#85929E',
                          }}>{`${formData.contract_start_date.toLocaleDateString(
                          'en-CA',
                        )} `}</Text>
                        <MaterialCommunityIcons
                          name="arrow-left-right"
                          size={15}
                          color="#85929E"
                        />
                        <Text
                          style={{
                            color: '#85929E',
                          }}>{` ${formData.contract_end_date.toLocaleDateString(
                          'en-CA',
                        )}`}</Text>
                      </View>
                    </>
                  )}
                  <Text
                    style={{
                      color: '#85929E',
                      marginTop: hp('2%'),
                      fontWeight: '500',
                    }}>{`Date Visit`}</Text>
                  <Text
                    style={{
                      color: '#85929E',
                    }}>{`${formData.date_of_visit.toLocaleDateString(
                    'en-CA',
                  )} • ${formData.time_of_visit.toLocaleTimeString()}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: hp('2%'),
                    marginTop: hp('2%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#E57373',
                      backgroundColor: '#FFEBEE',
                      paddingVertical: hp('1%'),
                      paddingHorizontal: wp('2%'),
                      borderRadius: 6,
                      width: wp('24%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{color: '#E57373'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#90CAF9',
                      backgroundColor: '#E3F2FD',
                      paddingVertical: hp('1%'),
                      paddingHorizontal: wp('2%'),
                      borderRadius: 6,
                      width: wp('24%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={handleSubmit}>
                    <Text style={{color: '#1E88E5'}}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={modalSuccessVisible}
          onRequestClose={() => setModalSuccessVisible(!modalSuccessVisible)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalSuccessContainer}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: hp('2%'),
                  paddingHorizontal: wp('2%'),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="check-circle" size={hp('6%')} color="#81C784" />
                  </View>
                  <Text
                    style={{
                      color: '#5D6D7E',
                      fontSize: hp('2.4%'),
                      fontWeight: '500',
                    }}>
                    Request has been sent
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp('4%'),
                    flex: 1,
                  }}>
                  <Text style={{color: '#85929E', textAlign: 'center'}}>
                    You will be notify when homeowner accept your visit request
                    or not.
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: hp('3%'),
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#81C784',
                      backgroundColor: '#E8F5E9',
                      paddingVertical: hp('1.5%'),
                      paddingHorizontal: wp('2%'),
                      borderRadius: 6,
                      width: wp('58%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={handleContinue}>
                    <Text style={{color: '#388E3C'}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* /Error Modal/ */}
        <Modal
          transparent={true}
          visible={modalIsRequestExistVisible}
          onRequestClose={() =>
            setModalIsRequestExistVisible(!modalIsRequestExistVisible)
          }>
          <View style={styles.modalOverlay}>
            <View style={styles.modalErrorContainer}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: hp('2%'),
                  paddingHorizontal: wp('2%'),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="error" size={hp('6%')} color="#E57373" />
                  </View>
                  <Text
                    style={{
                      color: '#5D6D7E',
                      fontSize: hp('2.4%'),
                      fontWeight: '500',
                    }}>
                    Request has not proccess
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp('4%'),
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: '#85929E',
                      textAlign: 'center',
                    }}>
                    You already have request for this homeowner. wait until ..
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',

                    marginTop: hp('3%'),
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#E57373',
                      paddingVertical: hp('1.5%'),
                      backgroundColor: '#FFEBEE',
                      borderRadius: 6,
                      width: wp('58%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={handleContinueError}>
                    <Text style={{color: '#E57373'}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={hp('3.6%')} color="#5D6D7E" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Request Visit</Text>
        </View>
        <Text
          style={
            classifyValue === 'contractor'
              ? {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('2%'),
                }
              : {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('3%'),
                  marginTop: hp('2%'),
                }
          }>
          Homeowner
        </Text>
        <DropDownPicker
          open={homeownerOpen}
          value={homeownerValue}
          items={homeowner}
          setOpen={setHomeownerOpen}
          setValue={setHomeownerValue}
          setItems={setHomeowner}
          onChangeValue={handleDropDownChangeHomeowner}
          placeholder="Select Homeowner"
          closeOnBackPressed={true}
          zIndex={4000}
          style={{
            backgroundColor: errors.homeowner_id ? '#FFEBEE' : '#f6f8fa',
            borderWidth: errors.homeowner_id ? 1 : 0,
            borderColor: errors.homeowner_id && '#E57373',
          }}
          placeholderStyle={{
            color: errors.homeowner_id ? '#E57373' : '#85929E',
          }}
          textStyle={{
            color: '#85929E',
            fontSize: hp('2%'),
          }}
          selectedItemContainerStyle={{
            backgroundColor: '#f6f8fa',
          }}
          listItemLabelStyle={{
            color: '#85929E',
          }}
        />

        <Text
          style={
            classifyValue === 'contractor'
              ? {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('2%'),
                  marginTop: hp('1%'),
                }
              : {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('3%'),
                  marginTop: hp('4%'),
                }
          }>
          Your Information
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#85929E"
            value={`${first_name} ${last_name}`}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            placeholderTextColor="#85929E"
            value={formData.contact_num}
            onChangeText={value => handleChange('contact_num', value)}
            keyboardType="phone-pad"
            editable={false}
          />
        </View>
        <DropDownPicker
          open={classifyOpen}
          value={classifyValue}
          items={classify}
          setOpen={setClassifyOpen}
          setValue={setClassifyValue}
          setItems={setClassify}
          placeholder="Classification"
          closeOnBackPressed={true}
          zIndex={3000}
          onChangeValue={handleDropDownChangeClassify}
          style={{
            backgroundColor: errors.classify_as ? '#FFEBEE' : '#f6f8fa',
            marginTop: hp('1%'),
            borderWidth: errors.classify_as ? 1 : 0,
            borderColor: errors.classify_as && '#E57373',
          }}
          placeholderStyle={{
            color: errors.classify_as ? '#E57373' : '#85929E',
          }}
          textStyle={{
            color: '#85929E',
            fontSize: hp('2%'),
          }}
          selectedItemContainerStyle={{
            backgroundColor: '#f6f8fa',
          }}
          listItemLabelStyle={{
            color: '#85929E',
          }}
        />

        {classifyValue === 'contractor' && (
          <>
            <Text
              style={{
                color: '#5D6D7E',
                fontSize: hp('2.4%'),
                fontWeight: '500',
                paddingVertical: hp('2%'),
                marginTop: hp('1%'),
              }}>
              Contract Range
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: hp('2%'),
              }}>
              <View>
                <View
                  style={{
                    position: 'absolute',
                    top: -16,
                  }}>
                  <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                    Start Contract
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => showModeContractRange('start-date')}
                    style={styles.dateButton}>
                    <Text style={styles.dateText}>
                      {contractStartDate.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <MaterialCommunityIcons
                name="arrow-left-right"
                size={15}
                color="#85929E"
              />
              <View>
                <View style={{position: 'absolute', top: -16}}>
                  <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                    End Contract
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => showModeContractRange('end-date')}
                    style={styles.dateButton}>
                    <Text style={styles.dateText}>
                      {contractEndDate.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}

        <Text
          style={
            classifyValue === 'contractor'
              ? {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('2%'),
                  marginTop: hp('1%'),
                }
              : {
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  fontWeight: '500',
                  paddingVertical: hp('3%'),
                  marginTop: hp('4%'),
                }
          }>
          Date Visit
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: hp('2%'),
          }}>
          <View>
            <View style={{position: 'absolute', top: -16}}>
              <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>Date</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => showMode('date')}
                style={styles.dateButton}>
                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Entypo name="dot-single" size={25} color="#85929E" />
          <View>
            <View style={{position: 'absolute', top: -16}}>
              <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>Time</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => showMode('time')}
                style={styles.dateButton}>
                <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showContractRange && (
          <DateTimePicker
            value={
              contractRangeMode === 'start-date'
                ? contractStartDate
                : contractEndDate
            }
            mode="date"
            display="default"
            onChange={onChangeContractDate}
            style={styles.dateTimePicker}
          />
        )}

        {show && (
          <DateTimePicker
            value={mode === 'date' ? date : time}
            mode={mode}
            display="default"
            onChange={onChange}
            style={styles.dateTimePicker}
          />
        )}

        <TouchableOpacity
          style={
            classifyValue === 'contractor'
              ? styles.submitButtonContractual
              : styles.submitButton
          }
          onPress={handleModal}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  primaryTextColor: {
    color: '#5D6D7E',
  },
  subTextColor: {
    color: '#85929E',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    gap: hp('3%'),
  },
  headerText: {
    color: '#5D6D7E',
    fontWeight: '500',
    fontSize: hp('2.6%'),
  },
  sectionTitle: {
    color: '#5D6D7E',
    fontWeight: '500',
    fontSize: hp('2.6%'),
    paddingVertical: hp('2%'),
  },
  sectionInfo: {
    marginTop: hp('2%'),
  },
  sectionDate: {
    marginTop: hp('2%'),
  },
  inputContainer: {
    marginTop: hp('1%'),
  },
  input: {
    width: '100%',
    color: '#85929E',
    paddingHorizontal: wp('3%'),
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    fontSize: hp('2%'),
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#f6f8fa',
    borderRadius: 4,
    width: wp('25%'),
    paddingVertical: hp('2%'),
    borderRadius: 8,
  },
  dateText: {
    fontSize: hp('2%'),
    color: '#85929E',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: hp('6%'),
    paddingVertical: hp('1.6%'),
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#90CAF9',
    alignItems: 'center',
  },
  submitButtonContractual: {
    marginTop: hp('4%'),
    paddingVertical: hp('1.6%'),
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#1E88E5',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalProcessContainer: {
    width: wp('90%'),
    height: hp('63%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalProcessContainerContractor: {
    width: wp('90%'),
    height: hp('73%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalSuccessContainer: {
    width: wp('70%'),
    height: hp('36%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalErrorContainer: {
    width: wp('70%'),
    height: hp('36%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
});
