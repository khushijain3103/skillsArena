const url = "http://localhost:3001";
export const register = async ({ name: username, password, email }) => {
  const response = await fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });
  const data = await response.json();
  return data;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const getUser = async () => {
  const response = await fetch(`${url}/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const addCourse = async ({
  title,
  description,
  url: urlParam,
  stars,
  cost,
  instructor,
}) => {
  const response = await fetch(`${url}/add-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title,
      description,
      url: urlParam,
      stars,
      cost,
      instructor,
    }),
  });
  const data = await response.json();
  return data;
};
export const addVideo = async ({ title, URL, format, courseId }) => {
  const response = await fetch(`${url}/add-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ title, URL, format, courseId }),
  });
  const data = await response.json();
  return data;
};

export const getCourses = async () => {
  const response = await fetch(`${url}/read-courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const deleteCourse = async ({ id }) => {
  const response = await fetch(`${url}/delete-course/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

// get user courses
export const getUserCourses = async () => {
  const response = await fetch(`${url}/get-user-courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

// update video
export const updateVideo = async ({
  courseId,
  videoId,
  title,
  URL,
  format,
}) => {
  const response = await fetch(`${url}/update-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ courseId, videoId, title, URL, format }),
  });
  const data = await response.json();
  return data;
};

//update course
export const updateCourse = async ({
  courseId,
  title,
  description,
  url: param,
  stars,
  cost,
  instructor,
  videos,
}) => {
  const response = await fetch(`${url}/update-course`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      courseId,
      title,
      description,
      url: param,
      stars,
      cost,
      instructor,
      videos,
    }),
  });
  const data = await response.json();

  return data;
};

// delete video
export const deleteVideo = async ({ courseId, videoId }) => {
  const response = await fetch(`${url}/delete-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ courseId, videoId }),
  });
  const data = await response.json();
  return data;
};

export const getInstructors = async () => {
  const response = await fetch(`${url}/read-all-instructors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const addInstructor = async ({ FirstName, LastName, email, Bio }) => {
  const response = await fetch(`${url}/create-instructor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      firstName: FirstName,
      lastName: LastName,
      email: email,
      bio: Bio,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateInstructor = async ({
  FirstName,
  LastName,
  email,
  Bio,
  _id: id,
}) => {
  const response = await fetch(`${url}/update-instructor/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      firstName: FirstName,
      lastName: LastName,
      email: email,
      id,
      bio: Bio,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteInstructor = async ({ id }) => {
  const response = await fetch(`${url}/delete-instructor/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};
