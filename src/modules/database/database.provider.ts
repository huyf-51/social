import AppDataSource from 'src/database/config/typeorm';

export default {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    try {
      await AppDataSource.initialize();
      console.log('Database connected');
      return AppDataSource;
    } catch (error) {
      console.log(error);
    }
  },
};
