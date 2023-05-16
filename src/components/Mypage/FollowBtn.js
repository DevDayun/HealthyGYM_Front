import React, {useEffect, useMemo, useState} from "react";
import axios from '../../utils/CustomAxios';

function FollowBtn({token, foltarget}) {

    const authToken = localStorage.getItem("memberseq");
    const newtoken = useMemo(() => ({memberseq: authToken}), [authToken]);

    const [userFollow, setUserFollow] = useState(false);

    useEffect(() => {

        const requestBody = {
            memberseq: newtoken.memberseq,
            foltarget: foltarget,
        };

        axios.post("http://localhost:3000/confirm/follow", requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setUserFollow(response.data);   // follow 여부 세팅
        });
    }, [newtoken,foltarget]);

    const handleButtonClick = () => {

        if(userFollow === false){

            const requestBody = {
                memberseq: token.memberseq,
                foltarget: foltarget,
            };

            axios.post("http://localhost:3000/request/follow", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setUserFollow(!userFollow);
            });

        } else {

            const requestBody = {
                memberseq: token.memberseq,
                foltarget: foltarget,
            };

            axios.post("http://localhost:3000/request/unfollow", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                setUserFollow(!userFollow);
            });
        }
    };

    const buttonClass = userFollow ? "mypage-profilecard-22" : "mypage-profilecard-23";

    return (
        <div>
            <div className="mypage-profilecard-12">
                <div>
                    <div className={buttonClass} onClick={handleButtonClick}>
                        {userFollow ? (
                            <>
                                <i className="check icon" style={{paddingBottom:'20px',color:'#999'}}></i>
                                팔로잉
                            </>
                        ) : (
                            "팔로우"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowBtn;