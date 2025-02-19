import Moment from "moment";

export const createADevice = async (
  account,
  idToken,
  { title, entity_id, type }
) => {
  return await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/createashareddevice",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        account: account,
        name: title,
        entity_id: entity_id,
        type: type,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(account);
      // console.log(idToken)
      // console.log(entity_id)
      // console.log(type)

      // vv This line may break everything vv
      propertyTest(account, idToken, data.message);
      return data;
    })
    .catch((err) => console.log(err));
};

export const propertyTest = async (account, idToken, sharedPropertyID) => {
  const response = await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/property",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        account: account,
        device: sharedPropertyID,
        geofencing: 0,
        access_type: 0,
        all_day: 0,
        time_start: null,
        time_end: null,
        date_start: null,
        date_end: null,
        reoccuring: null,
        reoccuring_type: 0,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export const deleteHub = async (idToken) => {
  const response = await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/hub",
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      return data;
    })
    .catch((err) => console.log(err));
};

export const checkUserExists = async (idToken, email) => {
  const response = await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/checkuserexists",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        // TODO: Have the email come from user input
        email: email,
      }),
    }
  );
  console.log(response);
  return response.json();
};

export const createHub = async ({ hub_url, hub_token }, idToken) => {
  // console.log('Bearer ' + idToken)
  // console.log(JSON.stringify({
  //   hub_url: hub_url,
  //   hub_email: hub_email,
  //   hub_password: hub_password}))

  return await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/updatehubinfo",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hub_url: hub_url,
        hub_token: hub_token,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export const changeRole = async (user_type, idToken) => {
  // console.log('Bearer ' + idToken)
  // console.log(JSON.stringify({
  //   hub_url: hub_url,
  //   hub_email: hub_email,
  //   hub_password: hub_password}))

  return await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/toggleusertype",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_type: user_type,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export const changeRadius = async (idToken, radius) => {
  return await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/gps",
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        geofencing_range: radius,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export const createSharedUser = async (idToken, email) => {
  return await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/createshareduser",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-type": "application/json",
        Accept: "*/*",
      },
      // TODO: Change this to user input
      body: JSON.stringify({
        email: email,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("====CREATE SHARED USER: ",data);
      return data;
    })
    .catch((err) => console.log(err));
};

// Sends a command to a hub
export const useSharedDevice = async (account, device, property) => {
  const response = await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/usedevice",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.appData.idToken,
      },
      body: JSON.stringify({
        account: account.login_credentials_id,
        device: device.shared_device_properties_id,
        property: property.shared_property_id,
        value: !property.value,
      }),
    }
  );
  return response.json();
};

export const createProperty = async (
  idToken,
  accountId,
  deviceId,
  property,
  options
) => {
  var days = "";
  var scheduledEndDate = "";
  var scheduledStartDate = "";
  var scheduledEndTime = "";
  var scheduledStartTime = "";
  var tempDate = "";
  var tempTime = "";

  // check if we've selected Temporary
  if (options.selection == 0) {
    tempDate = Moment(options.tempDate).format("MM/DD/YY");
    tempTime = Moment(options.tempDate).format("HH:mm");
  }
  // check if we've selected Scheduled
  if (options.selection == 1) {
    // Get dates MM/DD/YY
    scheduledStartDate = Moment(options.scheduledStartDate).format("MM/DD/YY");
    scheduledEndDate = Moment(options.scheduledEndDate).format("MM/DD/YY");

    // Get times MM:HH
    scheduledStartTime = Moment(options.scheduledStartDate).format("HH:mm");
    scheduledEndTime = Moment(options.scheduledEndDate).format("HH:mm");

    // Sort options days
    options.scheduledDays.sort((a, b) => a - b);

    // Build the string for days
    for (var i = 0; i < options.scheduledDays.length; i++) {
      if (options.scheduledDays[i] == 0) {
        days += "Mon";
      } else if (options.scheduledDays[i] == 1) {
        days += "Tue";
      } else if (options.scheduledDays[i] == 2) {
        days += "Wed";
      } else if (options.scheduledDays[i] == 3) {
        days += "Thu";
      } else if (options.scheduledDays[i] == 4) {
        days += "Fri";
      } else if (options.scheduledDays[i] == 5) {
        days += "Sat";
      } else if (options.scheduledDays[i] == 6) {
        days += "Sun";
      }
      // Days of the week follow format ddd, so the full week would be: MonTueWedThuFriSatSun
    }
  }

  // Check if marked as No Access
  if (property.access == 0)
    return "Cant create not allow property " + property.access;

  const response = await fetch(
    "https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/property",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify({
        account: accountId,
        device: deviceId,
        name: property.title + "",
        type: property.type + "",
        path: property.links[0].href + "",
        read_only: property.access == 2 ? 0 : 1,

        // Unrestricted access is if the options we selected is 2
        unrestricted: options.selection == 2 ? 1 : 0,

        // Temporary access is if the options we selected is 0
        temporary: options.selection == 0 ? 1 : 0,
        temp_time_range_start: "00:00", // Make sure to follow HH:MM 24-hour format for the time range
        temp_time_range_end: tempTime,
        temp_date: tempDate, // Dates should be of format MM/DD/YY

        // Time_Range access is if the options we selected is 1
        time_range: options.selection == 1 ? 1 : 0,
        time_range_start: scheduledStartTime,
        time_range_end: scheduledEndTime,
        time_range_reoccuring: days, // Days of the week follow format ddd, so the full week would be: MonTueWedThuFriSatSun
        time_range_start_date: scheduledStartDate,
        time_range_end_date: scheduledEndDate,

        // GPS coming in the *future*
        gps_location: null,
        gps_location_distance: null,
      }),
    }
  );
  return response.json();
};
