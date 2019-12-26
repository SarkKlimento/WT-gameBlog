function getURLParameter(parameterName, defaultValue) {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const parameter = url.searchParams.get(parameterName);
    return parameter && parameter.length > 0 ? parameter : defaultValue;
}