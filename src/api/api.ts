import request from '@/utils/request';

export const getUser = (data: any) => request.get('user', {
    params: {
        pageNum: 1,
        pageSize: 10,
        search: '',
    }
});