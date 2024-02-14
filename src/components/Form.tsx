import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'; 

import {
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Button,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";

import { PhoneIcon } from "@chakra-ui/icons";



const dataInfo = z.object({
    name: z.string(),
    phone: z.string(),
    cep: z.bigint(),
    endereço: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    uf: z.string(),
    numeroEndereço: z.string(),
})

type DataInfo = z.infer<typeof dataInfo>


const Form = () => {
    
  const {register, handleSubmit, setValue, setFocus} = useForm<DataInfo>({resolver: zodResolver(dataInfo)}); 

  function onSubmitData(e: DataInfo) {
    console.log(e);
  }

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setValue('endereço', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.localidade);
      setValue('uf', data.uf);
      setFocus('numeroEndereço');
    });
  }
    

    return (
        <Box h="100vh" >
            <Center 
             as='header' 
             h={150}
             w='80%'
             borderBottomRadius={'50px'}
             marginLeft={'10%'}
             bg="gray.500" 
             pb="8">
                
            </Center>

            <Flex 
             align="center" 
             justify="center" 
             bg="blackAlpha.200" 
             h="calc(100vh - 150px)"
            >
                <Center 
                 w="100%" 
                 maxW="840" 
                 bg={'white'} 
                 top={100} 
                 position={'absolute'} 
                 borderRadius={15} 
                 p={'60px'} 
                 boxShadow={"0 1px 2px #ccc"}
                >
                    <FormControl display={'flex'} flexDir={'column'} gap={'8'} onSubmit={handleSubmit(onSubmitData)} >
                        <HStack spacing={'4'}>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='name'>Nome Completo</FormLabel>
                                <Input type='text'  focusBorderColor='gray.300' {...register("name")} />
                            </Box>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='email'>Celular</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                        <PhoneIcon color='gray.300' />
                                    </InputLeftElement>
                                    <Input type='tel' placeholder='Phone number' focusBorderColor='gray.300' {...register("phone")} />
                                </InputGroup>
                            </Box>
                        </HStack>
                        <HStack spacing={'4'}>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='nome'>Data de Nascimento</FormLabel>
                                <Input placeholder="Select Date and Time" size="md" type="datetime-local" focusBorderColor='gray.300'/>
                            </Box>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='cep'>Cep</FormLabel>
                                <Input type='text' focusBorderColor='gray.300'  {...register("cep")} onBlur={checkCEP}/>
                            </Box>
                        </HStack>
                        <HStack spacing={'4'}>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='endereço'>Endereço</FormLabel>
                                <Input type='text' {...register("endereço" )} focusBorderColor='gray.300'/>
                            </Box>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='numero'>Numero</FormLabel>
                                <Input type='text' {...register("numeroEndereço" )} focusBorderColor='gray.300'/>
                            </Box>
                        </HStack>
                        <HStack spacing={'4'}>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='complemento'>Complemento</FormLabel>
                                <Input id='complemento' focusBorderColor='gray.300'/>
                            </Box>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='bairro'>Bairro</FormLabel>
                                <Input type='text' {...register("bairro" )} focusBorderColor='gray.300'/>
                            </Box>
                        </HStack>
                        <HStack spacing={'4'}>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='cidade'>Cidade</FormLabel>
                                <Input type='text' {...register("cidade" )} focusBorderColor='gray.300'/>
                            </Box>
                            <Box w={'100%'}>
                                <FormLabel htmlFor='estado'>Estado</FormLabel>
                                <Input type='text' {...register("uf")} focusBorderColor='gray.300'/>
                            </Box>
                        </HStack>
                        <HStack justify={'center'}>
                            <Button w={240} p={'6'} type="submit" bg={'gray.500'} color={'white'} mt={'2'} _hover={{ bg:'gray.700' }}>
                                Send
                            </Button>
                        </HStack>
                    </FormControl>
                </Center>
            </Flex>
        </Box>
    );
};

export default Form;