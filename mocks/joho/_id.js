export default {
    delete({values}) {
        let status = 200;
        console.log(values);
        if (values.id === 13) status = 500;
        return [status];
    }
}