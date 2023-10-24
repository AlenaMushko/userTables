'use client';
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@mui/material";

import {UpdateUserForm} from "@/components";
import {useAppSelector} from "@/hooks ";

const UserIdPage = ({params}: { params: { id: string } }) => {
    const router = useRouter();
    const {isLogin} = useAppSelector(state => state.users);
// немаю достатньго досвіду роботи з Nest тому костилями викидаю незалогіненого юзера.
// В реакті знаю як зробити полюдськи, чи могли б мені у фідбеці підказати , як це вірно робити в Next.
    //Дякую
    useEffect(() => {
        if (!isLogin) {
            router.push('/login');
        }
    }, [isLogin]);
    const goToTable = () => {
        router.back();
    }

    return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button onClick={goToTable}>GO TO TABLE</Button>
            <UpdateUserForm userId={+params.id}/>
        </div>
    )
}

export default UserIdPage;
