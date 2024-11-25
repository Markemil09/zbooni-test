const env = process.env;
const baseUrl = env.EXPO_PUBLIC_BASE_URL;
const clientSecret = env.EXPO_PUBLIC_SCLIENT_SECRET;
const clientId = env.EXPO_PUBLIC_SCLIENT_ID;
const lClientId = env.EXPO_PUBLIC_LCLIENT_ID;
const lClientSecret = env.EXPO_PUBLIC_LCLIENT_SECRET;

/*
 * Gets the generic token for sign up.
 */
export const fetchToken = async () => {
    const url = `${baseUrl}api/v1/oauth/token/`;
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "client_credentials"
        };

        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', 
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result
        } catch (error) {
        console.log("ERROR : ", error)
        }
}

/**
 * Function to securely register a user.
 * 
 * @param {*} token
 * @param {*} body
 */
export const register = async (token: string, body: {}) => {
    const url = `${baseUrl}/api/v1/users/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: result,
            };
        }

        return result; 
    } catch (error) {
        console.log("Error in register:", error);
        throw error;
    }
};

/**
 * Function to securely login a user.
 * 
 * @param {*} body
 */
export const login = async (body: Record<string, any>) => {
    const url = `${baseUrl}/api/v1/oauth/token/`;
    try {
        const formattedBody = {
            ...body,
            client_id: lClientId,
            client_secret: lClientSecret,
            grant_type: "password"
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                message: errorData,
            };
        }

        

        return await response.json();
    } catch (error) {
        console.log("Error in login:", error);
        throw error;
    }
};


