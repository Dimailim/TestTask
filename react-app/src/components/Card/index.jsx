import {useEffect, useState} from "react";
import {Alert, Button, Collapse, FormControl, TextField} from "@mui/material";
import useHandleChange from "../../hooks/UseHandleChange";
import './index.css';
import axios from "axios";

function Card() {
    const validatorCardNumber = () => {
        let regular = /\d+/;
        if (regular.test(textCardNumber)  && textCardNumber.length === 16) {
            setErrors({...errors, errorCardNumber: false});
            setHelperTexts({...helperTexts, helperTextCardNumber: ''});
        } else {
            if (textCardNumber.length > 0) {
                setErrors({...errors, errorCardNumber: true});
                if (textCardNumber.length !== 16) {
                    setHelperTexts({...helperTexts, helperTextCardNumber: "Длина должна быть 16 символов"});
                }
                if (!regular.test(textCardNumber)) {
                    setHelperTexts({...helperTexts, helperTextCardNumber: "Номер карты должен состоять только из цифр"});
                }
                if (textCardNumber.length !== 16 && !regular.test(textCardNumber)) {
                    setHelperTexts({...helperTexts,helperTextCardNumber: "Номер карты должен состоять из 16 символов и только из цифр"});
                }
            }
        }
    };

    const validatorExpiryDate = () => {
        let regular = /\d{2}\/\d{4}/;
        if (regular.test(textExpiryDate) && textExpiryDate.length > 0) {
            setErrors({...errors, errorExpiryDate: false});
            setHelperTexts({...helperTexts, helperTextExpiryDate: ''});
        } else {
            if (textExpiryDate.length > 0 && !regular.test(textExpiryDate)) {
                setErrors({...errors, errorExpiryDate: true});
                setHelperTexts({...helperTexts, helperTextExpiryDate: "Введите срок действия карты в формате 01/1900"});
            }
        }
    };
    const validatorCVV = () => {
        let regular = /\d{3}/;
        if (regular.test(textCVV) && textCVV.length === 3) {
            setErrors({...errors,errorCVV:  false});
            setHelperTexts({...helperTexts, helperTextCVV: ''});
        } else if (textCVV.length > 0 && regular.test(textCVV)) {
            setErrors({...errors, errorCVV: true});
            setHelperTexts({...helperTexts, helperTextCVV: "Введите число не более трех символов"})
        }
    };
    const validatorSum = () => {
        let regular = /\d+/;
        if (regular.test(textSum) && textSum.length > 0) {
            setErrors({...errors, errorSum: false});
            setHelperTexts(({...helperTexts, helperTextSum: ''}));
        } else if (textSum.length > 0 && !regular.test(textSum)) {
            setErrors({...errors, errorSum: true});
            setHelperTexts({...helperTexts, helperTextSum: "Сумма должна состоять из цифр"});
        }
    };

    let setTextCVV;
    let setTextCardNumber;
    let setTextExpiryDate;
    let setTextSum;

    const [textCardNumber, handleChangeCardNumber] = useHandleChange(setTextCardNumber);
    const [textCVV, handleChangeCVV] = useHandleChange(setTextCVV);
    const [textExpiryDate, handleChangeExpiryDate] = useHandleChange(setTextExpiryDate);
    const [textSum, handleChangeSum] = useHandleChange(setTextSum);
    const [errors, setErrors] = useState({
        'errorCardNumber': false,
        'errorCVV': false,
        'errorExpiryDate': false,
        'errorSum': false
    });
    const [helperTexts, setHelperTexts] = useState({
        'helperTextCardNumber': '',
        'helperTextCVV': '',
        'helperTextExpiryDate': '',
        'helperTextSum': ''
    });
    const [isDisable, setDisable] = useState(true);
    const [isOpen, setOpen] = useState(false);

    let arrayText = [textCardNumber, textCVV, textExpiryDate, textSum];
    let arrayError = Object.values(errors);

    const sendForm = () => {
        let objectData = {
            "CardNumber": textCardNumber,
            "CVV": textCVV,
            "ExpiryDate": textExpiryDate,
            "Sum": textSum
        };
        axios({
            method: 'post',
            url: '/createOrder',
            data: objectData
        }).then((response) => {
            console.log(response);
            setOpen(true);
        }).catch((error) => {
            console.error("Error: ", error);
        });
    }

    useEffect(() => {
        if (arrayText.some(elem => elem.length === 0) || arrayError.some(elem => elem === true)) {
            setDisable(true)
        } else {
            setDisable(false);
        }
    }, [...arrayError, arrayText]);

    return(
        <div>
            <Collapse in={isOpen}>
                <Alert
                    onClose={() => { setOpen(false); }}
                    sx={{
                        width: '50%',
                        marginLeft: '25%'
                    }}
                >
                    Запрос успешно отправлен!
                </Alert>
            </Collapse>
            <FormControl className='Card'>
                    <TextField
                        label={"Номер карты"}
                        error={errors.errorCardNumber}
                        helperText={helperTexts.helperTextCardNumber}
                        value={textCardNumber}
                        onChange={handleChangeCardNumber}
                        onBlur={validatorCardNumber}
                        style={{
                            marginTop: 10
                        }}
                    />
                    <TextField
                        label={"Срок действия"}
                        error={errors.errorExpiryDate}
                        helperText={helperTexts.helperTextExpiryDate}
                        value={textExpiryDate}
                        onChange={handleChangeExpiryDate}
                        onBlur={validatorExpiryDate}
                        style={{
                            marginTop: 10
                        }}
                    />
                    <TextField
                        label={"CVV"}
                        error={errors.errorCVV}
                        helperText={helperTexts.helperTextCVV}
                        value={textCVV}
                        onChange={handleChangeCVV}
                        onBlur={validatorCVV}
                        style={{
                            marginTop: 10
                        }}
                    />
                    <TextField
                        label={"Cумма"}
                        error={errors.errorSum}
                        helperText={helperTexts.helperTextSum}
                        value={textSum}
                        onChange={handleChangeSum}
                        onBlur={validatorSum}
                        style={{
                            marginTop: 10
                        }}
                    />
                <Button
                    variant="contained"
                    onClick={sendForm}
                    disabled={isDisable}
                    style={{
                        marginTop: 10
                    }}
                >
                    Оплатить
                </Button>
            </FormControl>
        </div>
    )
}

export default Card;