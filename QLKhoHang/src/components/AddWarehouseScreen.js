import { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AppStyle from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

let stat = [
    {
        id: 0,
        st: "true",
        status: "Hoạt động",
    },
    {
        id: 1,
        st: "false",
        status: "Ngưng hoạt động",
    },
]

export default function AddWarehouseScreen({ navigation }) {
    const { userInfo } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [wareHouseName, setWareHouseName] = useState();
    const [address, setAddress] = useState();
    const [idCategorie, setIdCategorie] = useState("");
    const [capacity, setCapacity] = useState();
    const [monney, setMonney] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [categorie, setCategorie] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        axios.get(`https://warehouse-management-api.vercel.app/v1/warehouse/category/list`,
            {
                headers:
                {
                    Authorization: `Bearer ${userInfo.accessToken}`
                },
            }).then((res) => {
                let categorie = res.data.categories;
                setCategories(categorie);
            }).catch((e) => {
                console.log(`get categories error ${e.res}`);
            });
    }, []);

    const showAlert = () =>
        Alert.alert(
            'Thêm thất bại',
            'Yêu cầu nhập đầy đủ thông tin cần thêm',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );

    const updateWarehouse = (wareHouseName, address, category, capacity, monney, status, description, owner, image) => {
        axios.post(`https://warehouse-management-api.vercel.app/v1/warehouse/create`, {
            wareHouseName: wareHouseName,
            address: address,
            category: category,
            capacity: capacity,
            currentCapacity: capacity,
            monney: monney,
            status: status,
            description: description,
            owner: owner,
            imageWarehouse: image,

        }, {
            headers:
            {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
            params:
            {
                id_owner: userInfo.others._id
            },
        }).then((res) => {
            Alert.alert("Thêm kho hàng thành công")
            navigation.navigate("Home")
        }).catch((e) => {
            console.log(`Add error ${e.request.response}`);
        });
    };

    const uploadToCloudinary = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const formData = new FormData();
                formData.append('file', { uri: result.assets[0].uri, name: 'file.jpg', type: 'image/jpeg' });
                formData.append('upload_preset', 'ImageProject');

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/dborrd4h5/image/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            // 'Authorization': `Basic ${btoa('your-api-key:your-api-secret')}`,
                        },
                    }
                );
                setImage(cloudinaryResponse.data.url)
                console.log('Uploaded image:', cloudinaryResponse.data.url);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <View>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome5 name="warehouse" size={20} color="black" />
                    <TextInput
                        placeholder=" Nhập tên kho hàng"
                        keyboardType="default"
                        value={wareHouseName}
                        onChangeText={text => setWareHouseName(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="address" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập địa chỉ kho hàng"
                        keyboardType="default"
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />
                </View>
                <Dropdown
                    style={AppStyle.StyleListProduct.dropdown}
                    placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
                    selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
                    inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
                    iconStyle={AppStyle.StyleListProduct.iconStyle}
                    data={categories}
                    maxHeight={300}
                    labelField="name"
                    valueField="_id"
                    placeholder="Chọn danh mục"
                    searchPlaceholder="Search..."
                    // value={name}
                    onChange={item => {
                        setIdCategorie(item._id);
                        setCategorie(item.acreage);
                    }}
                />
                <View style={AppStyle.StyleProfile.items}>
                    <MaterialIcons name="storage" size={20} color="black" />
                    <TextInput
                        placeholder="Nhập dung tích"
                        keyboardType="numeric"
                        value={capacity}
                        onChangeText={text => setCapacity(text)}
                    />
                    <Text style={{ fontSize: 16, marginTop: 2 }}> {categorie}</Text>
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome name="money" size={20} color="black" /><Text> </Text>
                    <TextInput
                        placeholder="Nhập số tiền"
                        keyboardType="numeric"
                        value={monney}
                        onChangeText={text => setMonney(text)}
                    />
                </View>

                <Dropdown
                    style={AppStyle.StyleListProduct.dropdown}
                    placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
                    selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
                    inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
                    iconStyle={AppStyle.StyleListProduct.iconStyle}
                    data={stat}
                    maxHeight={300}
                    labelField="status"
                    valueField="id"
                    placeholder="Thiết lập trạng thái"
                    onChange={(item) => {
                        { item.id === 0 ? setStatus(true) : setStatus(false) }
                    }}
                />
                <View style={AppStyle.StyleProfile.items}>
                    <FontAwesome5 name="sticky-note" size={20} color="black" />
                    <TextInput
                        placeholder=" Nhập ghi chú"
                        keyboardType="default"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
                <View style={AppStyle.StyleProfile.items}>
                    <Entypo name="user" size={20} color="black" />
                    <Text>{userInfo.others.username}</Text>
                </View>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_upload}
                    onPress={() =>
                        Alert.alert(
                            "",
                            "Bạn có muốn cập nhật hình ảnh không?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "OK", onPress: () => uploadToCloudinary()
                                },
                            ],
                            { cancelable: false }
                        )
                    }>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Thêm hình ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_edit}
                    onPress={() => {
                        (!wareHouseName || !address || !idCategorie || !capacity || !monney || !status || !description || !image)
                            ? showAlert()
                            : updateWarehouse(wareHouseName, address, idCategorie, capacity, monney, status, description, userInfo.others._id, image)
                    }}>

                    <AntDesign name="edit" size={20} color="#fff" />
                    <Text style={{ color: '#fff' }}>THÊM KHO HÀNG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('HomeNavigationOwner')
                    }>
                    <Text style={{ color: '#fff' }}>HỦY</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
