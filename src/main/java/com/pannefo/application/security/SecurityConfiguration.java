package com.pannefo.application.security;

import com.vaadin.flow.spring.security.VaadinWebSecurityConfigurerAdapter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends VaadinWebSecurityConfigurerAdapter {

    public static final String LOGOUT_URL = "/";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Public access
        http.authorizeRequests().antMatchers("/").permitAll();
        http.authorizeRequests().antMatchers("/about").permitAll();
        http.authorizeRequests().antMatchers("/home").permitAll();
        http.authorizeRequests().antMatchers("/leadership").permitAll();
        http.authorizeRequests().antMatchers("/departments").permitAll();
        http.authorizeRequests().antMatchers("/speeches").permitAll();
        http.authorizeRequests().antMatchers("/news").permitAll();

        super.configure(http);
        setLoginView(http, "/login", LOGOUT_URL);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
        web.ignoring().antMatchers("/images/*.png");
    }
}
