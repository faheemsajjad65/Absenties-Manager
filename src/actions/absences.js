import serviceMgr from '../services/absence.service'

export const getAllAbsences = () => async dispatch => {
    dispatch({
        type: "GET_ABSENCES_INIT"
    });

    try {

        const absences = await serviceMgr.getAllAbsences().then(response => response.data);
        const members = await serviceMgr.getAllMembers().then(response => response.data);;
        
        absences.map(absItem => {
            const memberData = members.find(item => item.userId===absItem.userId)
            return absItem.member_data = memberData;
        })
        
        dispatch({
            type: "GET_ABSENCES_SUCCESS",
            payload: absences,
        });

        return Promise.resolve(true)
        
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getFilteredAbsences = filters => (dispatch , getState) => {

    const {absences} = getState();
    let filteredAbsences = [];
    if(Object.keys(filters).length > 0){
        if("type" in filters && "date" in filters){
            filteredAbsences = absences.filter(item=> item.type === filters.type && item.createdAt.split("T")[0] === filters.date);
        }
        if("type" in filters)
            filteredAbsences = absences.filter(item=>item.type === filters.type);
        if("date" in filters)
            filteredAbsences = absences.filter(item=>item.createdAt.split("T")[0] === filters.date);

        dispatch({type:"GET_ABSENCES_SUCCESS",payload:filteredAbsences})
    }
    else{
        dispatch(getAllAbsences());
    }

    return Promise.resolve(true);
}
