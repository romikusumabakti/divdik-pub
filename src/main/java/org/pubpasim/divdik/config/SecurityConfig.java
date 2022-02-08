package org.pubpasim.divdik.config;

import org.pubpasim.divdik.component.AuthRequestFilter;
import org.pubpasim.divdik.service.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    AuthRequestFilter authRequestFilter;
    AccountDetailsService accountDetailsService;

    @Autowired
    public SecurityConfig(AuthRequestFilter authRequestFilter, AccountDetailsService accountDetailsService) {
        this.authRequestFilter = authRequestFilter;
        this.accountDetailsService = accountDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable().authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/**").permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/account/**").authenticated()
//                .antMatchers("/api/**").hasRole("ADMIN")
                .anyRequest()
                .authenticated();
        http
                .antMatcher("/api/**").addFilterBefore(authRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
