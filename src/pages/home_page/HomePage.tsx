import { Avatar, Box, Button, Container, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import picture from '../../assets/images/2.png';
import githubIcon from '../../assets/icons/github.png';
import team from '../../utils/constants/teamInfo';
import { useTypedSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const { isLogged } = useTypedSelector((state) => state.user);
  const { t } = useTranslation();

  return (
    <Box className={styles['welcome-wrapper']}>
      {!isLogged && (
        <Box className={styles['btns-wrapper']}>
          <Button
            onClick={() => navigate('/sign-up')}
            variant="contained"
            size="large"
            className={`${styles.btn} ${styles.override}`}
          >
            {t('welcome_page.sup_btn')}
          </Button>
          <Button
            onClick={() => navigate('/sign-in')}
            variant="contained"
            size="large"
            className={`${styles.btn} ${styles.override}`}
          >
            {t('welcome_page.sin_btn')}
          </Button>
        </Box>
      )}
      {isLogged && (
        <Box className={styles['btns-wrapper']}>
          <Button
            onClick={() => navigate('/boards')}
            variant="contained"
            size="large"
            className={`${styles.btn} ${styles.override}`}
          >
            {t('welcome_page.board_btn')}
          </Button>
        </Box>
      )}
      <Typography
        variant="h1"
        sx={{
          '@media (max-width: 800px)': { fontSize: '62px' },
          '@media (max-width: 550px)': { fontSize: '52px' },
          '@media (max-width: 440px)': { fontSize: '34px' },
        }}
      >
        Project manager
      </Typography>
      <Box className={styles['info-wrapper']}>
        <Typography paragraph fontSize={22} className={styles['info-text']}>
          {t('welcome_page.about')}
        </Typography>
        <img src={picture} alt="main picture" />
      </Box>
      <Box>
        <Typography variant="h2" align="center">
          {t('welcome_page.team')}
        </Typography>
        <Container maxWidth="lg" className={styles.container}>
          {team.map((member, i) => (
            <Box key={member.name} className={styles['member-wrapper']}>
              <Box className={styles['member']}>
                <Avatar
                  src={require(`../../assets/images/${member.photo}`)}
                  alt="person avatar"
                  className={`${styles['member-avatar']} ${styles.override}`}
                />
                <Box className={styles['member-info']}>
                  <a href={member.github}>
                    <img src={githubIcon} alt="link icon" />
                  </a>
                  <Typography
                    variant="h6"
                    align="center"
                    fontSize={34}
                    sx={{ '@media (max-width: 500px)': { fontSize: '26px' } }}
                  >
                    {member.name}
                  </Typography>
                  <Typography paragraph align="center" fontSize={18}>
                    {t(`welcome_page.info.${i}`)}
                  </Typography>
                </Box>
              </Box>
              {i !== team.length - 1 && <Divider sx={{ background: 'white' }} />}
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
