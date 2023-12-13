import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
  } from "@chakra-ui/react";
  import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import chatContext from "../Context/Chat/ChatContext";

const Login = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [show,setShow] = useState(false)
    const history = useNavigate()
    const toast = useToast()
    const context = useContext(chatContext)
    const {setUser} = context
    
    const handleClick = ()=>{ setShow(!show)}
    const submitHandler = async () => {
        setPicLoading(true);
        if (!email || !password) {
          toast({
            title: "Please fill all the details",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        }
        try {
          const data = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password
            }),
          });
          const result = await data.json()
          toast({
            title: "Login Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo",JSON.stringify(result))
          setPicLoading(false);
          history("/chat")
          setUser(result)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            setPicLoading(false);
        }
      };


    return (
        <VStack spacing={"5px"}>
          <FormControl isRequired id="email">
          <FormLabel>Email</FormLabel>
            <Input
            type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </FormControl>
          <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
          >
            Login in
          </Button>
          <Button
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={()=>{
                setEmail("guestuser@gmail.com")
                setPassword("guest")
            }}
            isLoading={picLoading}
          >
            Guest User
          </Button>
        </VStack>
      );
}

export default Login;
