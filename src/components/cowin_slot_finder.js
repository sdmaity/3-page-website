import React from 'react';
import '../App.css';

export default function CowinSlotFinder() {
    const [curDate, setCurDate] = React.useState(new Date());
    const [slot, setSlot] = React.useState([]);
    const apiCall = async function() {
        curDate = curDate.getDate() + '-' + (curDate.getMonth()+1) + '-' + curDate.getFullYear();
        let res = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=725&date=' + curDate);
        res = await res.json();
        res = res.centers;
        let data = {};
        res.filter(center => {
            
            center.sessions && center.sessions.forEach(session => {
                if (session.min_age_limit === 18) {
                    (!data[session.date]) && (data[session.date] = []);
                    data[session.date].push({
                        center_id: center.center_id,
                        name: center.name,
                        address: center.address,
                        available_capacity: session.available_capacity
                    })
                }
            }); 
        });
        console.log(data);
        setSlot(data);
    };

    React.useEffect(() => {
        apiCall();
    }, []);

  return (<div>

  </div>);
}