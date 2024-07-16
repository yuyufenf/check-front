const TimeUtil = {
    now(){

    },

    timeSub(startTime, endTime){


        let duration = endTime - startTime;
        let expire = duration <= 0;

        return {
            expire,
            duration
        };
    }
}

export default TimeUtil;